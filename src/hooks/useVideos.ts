import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Video {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  video_type: string;
  page_assignment: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const useVideos = (pageAssignment?: string) => {
  return useQuery({
    queryKey: ['videos', pageAssignment],
    queryFn: async () => {
      let query = supabase
        .from('videos')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (pageAssignment) {
        query = query.eq('page_assignment', pageAssignment);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Video[];
    }
  });
};

export const useAllVideos = () => {
  return useQuery({
    queryKey: ['all-videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Video[];
    }
  });
};

export const useCreateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (video: Omit<Video, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('videos')
        .insert(video)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      queryClient.invalidateQueries({ queryKey: ['all-videos'] });
    }
  });
};

export const useUpdateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Video> & { id: string }) => {
      const { data, error } = await supabase
        .from('videos')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      queryClient.invalidateQueries({ queryKey: ['all-videos'] });
    }
  });
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      queryClient.invalidateQueries({ queryKey: ['all-videos'] });
    }
  });
};
