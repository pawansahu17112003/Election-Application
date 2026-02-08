import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  election_type: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export const useContacts = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ContactSubmission[];
    }
  });
};

export const useSubmitContact = () => {
  return useMutation({
    mutationFn: async (contact: Omit<ContactSubmission, 'id' | 'is_read' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert(contact)
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  });
};

export const useMarkContactRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ is_read: true })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    }
  });
};
