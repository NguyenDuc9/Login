import api from './api';
export interface AIRequest {
  message: string;
}

export const PostAIRequest = async (data: AIRequest) => {
  const response = await api.post('/ai/chat', data);
  return response.data;
};
