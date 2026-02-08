// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { supabase } from '@/integrations/supabase/client';

// export interface Poster {
//   id: string;
//   title: string;
//   description?: string;
//   image_url: string;
//   page_assignment: 'home' | 'service' | 'about';
//   display_order: number;
//   is_active: boolean;
//   created_at: string;
//   updated_at: string;
// }

// // Fetch posters for a specific page
// export const usePosters = (page: string = 'home') => {
//   return useQuery({
//     queryKey: ['posters', page],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from('posters')
//         .select('*')
//         .eq('page_assignment', page)
//         .eq('is_active', true)
//         .order('display_order', { ascending: true });

//       if (error) throw error;
//       return data as Poster[];
//     },
//   });
// };

// // Fetch all posters for admin
// export const useAllPosters = () => {
//   return useQuery({
//     queryKey: ['posters', 'all'],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from('posters')
//         .select('*')
//         .order('display_order', { ascending: true });

//       if (error) throw error;
//       return data as Poster[];
//     },
//   });
// };

// // Create new poster
// export const useCreatePoster = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (poster: Omit<Poster, 'id' | 'created_at' | 'updated_at'>) => {
//       const { data, error } = await supabase
//         .from('posters')
//         .insert(poster)
//         .select()
//         .single();

//       if (error) throw error;
//       return data as Poster;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['posters'] });
//     },
//   });
// };

// // Update existing poster
// export const useUpdatePoster = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ id, ...poster }: Partial<Poster> & { id: string }) => {
//       const { data, error } = await supabase
//         .from('posters')
//         .update(poster)
//         .eq('id', id)
//         .select()
//         .single();

//       if (error) throw error;
//       return data as Poster;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['posters'] });
//     },
//   });
// };

// // Delete poster
// export const useDeletePoster = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (id: string) => {
//       const { error } = await supabase
//         .from('posters')
//         .delete()
//         .eq('id', id);

//       if (error) throw error;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['posters'] });
//     },
//   });
// };


import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Poster {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  page_assignment: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Fetch active posters for a specific page (public)
export const usePosters = (pageAssignment: string = 'home') => {
  return useQuery({
    queryKey: ['posters', pageAssignment],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posters')
        .select('*')
        .eq('page_assignment', pageAssignment)
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Poster[];
    },
  });
};

// Fetch all posters for admin
export const useAllPosters = () => {
  return useQuery({
    queryKey: ['posters', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posters')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Poster[];
    },
  });
};

// Create poster
export const useCreatePoster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (poster: Omit<Poster, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('posters')
        .insert(poster)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posters'] });
    },
  });
};

// Update poster
export const useUpdatePoster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Poster> & { id: string }) => {
      const { data, error } = await supabase
        .from('posters')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posters'] });
    },
  });
};

// Delete poster
export const useDeletePoster = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('posters')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posters'] });
    },
  });
};