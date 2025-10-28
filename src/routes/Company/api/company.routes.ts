import axios from 'axios';
import { CompanyENDPOINT } from './endpoint';
import { ApprovedInfluencersRequest, ApprovedInfluencersResponse, DeleterInfluenceerequest, InfluencerResponseProps, MoreInfluencerRequest, ReadyMadeInfluencersApiResponse, ReadyMadeInfluencersRequest } from '@/src/types/readymadeinfluencers-type';
import { GuidedQuestionsType } from '@/src/types/guidedquestion-type';
import { SignUpFormValidator } from '@/src/validators/Auth-Validator/signUp-Validators';
import { LoginFormValidator } from '@/src/validators/Auth-Validator/login-validator';
import useAuthStore from '@/src/store/AuthStore/authStore';
import { toast } from 'sonner';


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//Get All Jobs

export const FindInfluencer = async (influencerRequest: InfluencerResponseProps) => {
  const response = await api.post(CompanyENDPOINT.CREATE_CAMPAIGN, influencerRequest);
  return response.data;
};

export const Campaign = async () => {
  const response = await api.get(CompanyENDPOINT.CAMPAIGN);
  return response.data;
}

export const CampaignRejectedInfluencers = async () => {
  const response = await api.put(CompanyENDPOINT.CAMPAIGN_REJECTED_INFLUENCERS)
  return response.data;
}

export const CampaignApprovedInfluencers = async (campaign_id: string) => {
  const response = await api.get(CompanyENDPOINT.CAMPAIGN_APPROVED_INFLUENCERS)
  return response.data;
}


export const QuestionGuided = async (guidedQuestion: GuidedQuestionsType) => {
  const response = await api.post<GuidedQuestionsType>(CompanyENDPOINT.QUESTION_GUIDED, guidedQuestion);
  return response.data;
};


