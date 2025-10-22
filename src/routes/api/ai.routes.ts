import axios from 'axios';
import { AI_ENDPOINT } from './endpoint';
import { ApprovedInfluencersRequest, ApprovedInfluencersResponse, DeleterInfluenceerequest, InfluencerResponseProps, MoreInfluencerRequest, ReadyMadeInfluencersRequest } from '@/src/types/readymadeinfluencers-type';
import { GuidedQuestionsType } from '@/src/types/guidedquestion-type';
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const originalRequest = error.config;

//     const isLoginRequest =
//       originalRequest?.url?.includes(EMPLOYERAPI.EMPLOYER_LOGIN) &&
//       originalRequest?.method === 'post';

//     if (error.response && error.response.status === 401 && !isLoginRequest) {
//       clearAuthToken();

//       if (error.response?.status === 403) {
//         toast.error('Unauthorized access');
//       } else if (error.response?.status === 500) {
//         toast.error('Server error');
//       } else {
//         toast.error('Session expired. Please login again.');
//         window.location.href = '/login';
//       }
//     }

//     return Promise.reject(error);
//   },
// );

//Get All Jobs

export const FindInfluencer = async (influencerRequest: InfluencerResponseProps) => {
  const response = await api.post<ReadyMadeInfluencersRequest>(AI_ENDPOINT.FIND_INFLUENCER, influencerRequest);
  return response.data;
};

export const ApprovedInfluencersApi = async (influencerRequest: ApprovedInfluencersRequest) => {
  const response = await api.post<ApprovedInfluencersResponse>(AI_ENDPOINT.APPROVED_INFLUENCER, influencerRequest);
  return response.data;
}

export const RejectedInfluencer = async (influencerRequest: MoreInfluencerRequest) => {
  const response = await api.post<ReadyMadeInfluencersRequest>(AI_ENDPOINT.REJECTED_INFLUENCER, influencerRequest);
  return response.data;
}

export const DeleteInfluencer = async (deleteInfluencerRequest: DeleterInfluenceerequest) => {
  const response = await api.delete(AI_ENDPOINT.DELETE_INFLUENCER, { data: deleteInfluencerRequest });
  return response.data;
};


export const QuestionGuided = async (guidedQuestion: GuidedQuestionsType) => {
  const response = await api.post<GuidedQuestionsType>(AI_ENDPOINT.QUESTION_GUIDED, guidedQuestion);
  return response.data;
};
