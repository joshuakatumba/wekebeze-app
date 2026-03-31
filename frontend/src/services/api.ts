import { supabase } from "./supabaseClient";

// Helper to parse PostGIS POINT(lng lat) string
const parsePoint = (pointStr: string) => {
  if (!pointStr || typeof pointStr !== 'string') return { lat: 0, lng: 0 };
  const match = pointStr.match(/POINT\(([-\d.]+) ([-\d.]+)\)/);
  if (!match) return { lat: 0, lng: 0 };
  return { lng: parseFloat(match[1]), lat: parseFloat(match[2]) };
};

// Authentication API
export const authAPI = {
  getProfile: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    
    if (error) throw error;
    return { user: profile };
  },
};

// Chat API
export const chatAPI = {
  getChatNodes: async (cancerType: string, language: string) => {
    const { data, error } = await supabase
      .from("chat_nodes")
      .select("*")
      .eq("cancer_type", cancerType)
      .eq("language", language);
    
    if (error) throw error;
    return data.map((node: any) => ({
      ...node.node_data,
      cancerType: node.cancer_type,
      language: node.language,
      id: node.id
    }));
  },

  loadChatJson: async (cancerType: string, language: string) => {
    const nodes = await chatAPI.getChatNodes(cancerType, language);
    // Convert array to object map keyed by node_id for useChatFlow
    return nodes.reduce((acc: any, node: any) => {
      acc[node.id || node.node_id] = node;
      return acc;
    }, {});
  },
};

// Awareness API
export const awarenessAPI = {
  getAwarenessData: async (cancerType: string, language: string) => {
    const { data, error } = await supabase
      .from("awareness_data")
      .select("*")
      .eq("cancer_type", cancerType)
      .eq("language", language)
      .single();
    
    if (error) throw error;
    return data;
  },
};

// Screening API
export const screeningAPI = {
  getCenters: async (params: any = {}) => {
    if (params.lat && params.lng) {
      const { data, error } = await supabase.rpc("get_nearby_centers", {
        user_lat: parseFloat(params.lat),
        user_lng: parseFloat(params.lng),
        radius_meters: params.radius ? parseFloat(params.radius) * 1000 : 50000
      });
      if (error) throw error;
      return data;
    }

    let query = supabase.from("screening_centers").select("*, center_services(*)");
    
    if (params.district) query = query.eq("district", params.district);
    
    const { data, error } = await query;
    if (error) throw error;
    
    return data.map((c: any) => ({
      ...c,
      coordinates: parsePoint(c.coordinates)
    }));
  },

  getDistricts: async () => {
    const { data, error } = await supabase
      .from("screening_centers")
      .select("district");
    
    if (error) throw error;
    return [...new Set(data.map((item: any) => item.district))];
  },
};

// Progress API
export const progressAPI = {
  getUserProgress: async (cancerType: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("user_progress")
      .select("*, user_quiz_scores(*), user_chat_history(*)")
      .eq("user_id", user.id)
      .eq("cancer_type", cancerType)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  saveQuizScore: async (cancerType: string, score: number, total: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data: progress } = await supabase
      .from("user_progress")
      .upsert({ user_id: user.id, cancer_type: cancerType })
      .select()
      .single();

    return supabase
      .from("user_quiz_scores")
      .insert({ progress_id: (progress as any).id, score, total });
  },

  saveChatProgress: async (cancerType: string, nodeId: string, completed: boolean) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data: progress } = await supabase
      .from("user_progress")
      .upsert({ user_id: user.id, cancer_type: cancerType })
      .select()
      .single();

    return supabase
      .from("user_chat_history")
      .insert({ progress_id: (progress as any).id, node_id: nodeId, completed });
  },
};

// Admin API
export const adminAPI = {
  getAllUsers: async () => {
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) throw error;
    // Map 'name' to 'full_name' for UI compatibility
    const users = data.map((u: any) => ({
      ...u,
      full_name: u.name
    }));
    return { users };
  },

  updateUserStatus: async (userId: string, updates: any) => {
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId);
    if (error) throw error;
    return data;
  },

  deleteUser: async (userId: string) => {
    const { error } = await supabase.from("profiles").delete().eq("id", userId);
    if (error) throw error;
  },

  getAnalytics: async () => {
    // 1. Get total users count from profiles
    const { count: totalUsers } = await supabase
      .from("profiles")
      .select("*", { count: 'exact', head: true });

    // 2. Get counts of shared resources
    const { count: totalCenters } = await supabase
      .from("screening_centers")
      .select("*", { count: 'exact', head: true });
    
    // 3. Get total chat nodes across all types/langs
    const { count: totalChats } = await supabase
      .from("chat_nodes")
      .select("*", { count: 'exact', head: true });
    
    // 4. Get active engagement (users with progress records)
    const { count: totalProgress } = await supabase
      .from("user_progress")
      .select("*", { count: 'exact', head: true });

    // 5. Quiz completion stats
    const { count: totalQuizzes } = await supabase
      .from("user_quiz_scores")
      .select("*", { count: 'exact', head: true });

    return {
      overview: {
        totalUsers: totalUsers || 0,
        screeningCentersCount: totalCenters || 0,
        chatNodesCount: totalChats || 0,
      },
      users: {
        recentRegistrations: totalUsers || 0,
        engagedUsers: totalProgress || 0,
      },
      engagement: {
        quizCompletions: { 
          total: totalQuizzes || 0 
        },
        chatInteractions: totalProgress || 0,
      }
    };
  },

  getAllChatNodes: async (filters: any = {}) => {
    let query = supabase.from("chat_nodes").select("*");
    
    if (filters.cancerType) query = query.eq("cancer_type", filters.cancerType);
    if (filters.language) query = query.eq("language", filters.language);
    
    const { data, error } = await query;
    if (error) throw error;
    
    // Transform to frontend structure
    const chatNodes = data.map((node: any) => ({
      ...node,
      cancerType: node.cancer_type,
      language: node.language,
      nodeData: node.node_data,
      nodeId: node.node_id
    }));
    
    return { chatNodes };
  },

  createChatNode: async (node: any) => {
    const { data, error } = await supabase.from("chat_nodes").insert(node);
    if (error) throw error;
    return data;
  },

  updateChatNode: async (id: string, node: any) => {
    const { data, error } = await supabase.from("chat_nodes").update(node).eq("id", id);
    if (error) throw error;
    return data;
  },

  deleteChatNode: async (id: string) => {
    const { error } = await supabase.from("chat_nodes").delete().eq("id", id);
    if (error) throw error;
  },

  getAllScreeningCenters: async () => {
    const { data, error } = await supabase.from("screening_centers").select("*, center_services(*)");
    if (error) throw error;
    return { screeningCenters: data };
  },

  createScreeningCenter: async (center: any) => {
    const { coordinates, services, ...rest } = center;
    const point = `POINT(${coordinates.lng} ${coordinates.lat})`;
    
    const { data: newCenter, error } = await supabase
      .from("screening_centers")
      .insert({ ...rest, coordinates: point })
      .select()
      .single();
    
    if (error) throw error;

    if (services && services.length > 0) {
      await supabase.from("center_services").insert(
        services.map((s: any) => ({ ...s, center_id: (newCenter as any).id }))
      );
    }
    
    return newCenter;
  },

  updateScreeningCenter: async (id: string, center: any) => {
    const { coordinates, services, ...rest } = center;
    const point = `POINT(${coordinates.lng} ${coordinates.lat})`;
    
    const { error } = await supabase
      .from("screening_centers")
      .update({ ...rest, coordinates: point })
      .eq("id", id);
    
    if (error) throw error;

    await supabase.from("center_services").delete().eq("center_id", id);
    if (services && services.length > 0) {
      await supabase.from("center_services").insert(
        services.map((s: any) => ({ ...s, center_id: id }))
      );
    }
  },

  deleteScreeningCenter: async (id: string) => {
    const { error } = await supabase.from("screening_centers").delete().eq("id", id);
    if (error) throw error;
  },

  // Quiz Management
  getAllQuizzes: async (filters: any = {}) => {
    let query = supabase.from("quizzes").select("*");
    if (filters.cancerType) query = query.eq("cancer_type", filters.cancerType);
    
    const { data, error } = await query;
    if (error) throw error;
    
    return { 
      quizzes: data.map((q: any) => ({
        ...q,
        cancerType: q.cancer_type,
      })) 
    };
  },

  createQuiz: async (quiz: any) => {
    const { cancerType, ...rest } = quiz;
    const { data, error } = await supabase.from("quizzes").insert({
      ...rest,
      cancer_type: cancerType
    });
    if (error) throw error;
    return data;
  },

  updateQuiz: async (id: string, quiz: any) => {
    const { cancerType, ...rest } = quiz;
    const { data, error } = await supabase.from("quizzes").update({
      ...rest,
      cancer_type: cancerType
    }).eq("id", id);
    if (error) throw error;
    return data;
  },

  deleteQuiz: async (id: string) => {
    const { error } = await supabase.from("quizzes").delete().eq("id", id);
    if (error) throw error;
  },

  // Awareness Management
  updateAwarenessData: async (cancerType: string, language: string, content: any) => {
    const { error } = await supabase
      .from("awareness_data")
      .upsert({
        cancer_type: cancerType,
        language: language,
        ...content
      });
    if (error) throw error;
  },
};

export const api = {
  auth: authAPI,
  chat: chatAPI,
  awareness: awarenessAPI,
  screening: screeningAPI,
  progress: progressAPI,
  admin: adminAPI,
  loadChatJson: chatAPI.loadChatJson,
  ...adminAPI
};
