/** Интерфейс класса для работы с GitHub API
 * названия getSomeData и postSomeData
 * (а также типов GetSomeDataParams и PostSomeDataPrams)
 * поменяйте в соответствии с выполняемым запросом.
 * Выберите любой запрос из публичного API GitHub.
 */

import { ApiResponse } from "../../shared/store/ApiStore/types";

export type PostCreateRepoParams = {
  orgName: string;
  name: string;
  description?: string;
  homepage?: string;
  private?: boolean;
  has_issues?: boolean;
  has_projects?: boolean;
  has_wiki?: boolean;
  is_template?: boolean;
};

export type GetRepoListParams = {
  orgName: string;
  type?: string;
  sort?: string;
  direction?: string;
  per_page?: number;
  page?: number;
};

export type GetRepoBranchesParams = {
  owner: string;
  repo: string;
  per_page?: number;
  page?: number;
};

type RepoOwner = {
  id: number;
  login: string;
  avatar_url: string;
  url: string;
};

export type RepoItem = {
  id: number;
  name: string;
  url: string;
  stargazers_count: number;
  owner: RepoOwner;
  updated_at: string;
};

export type BranchesItem = {
  name: string;
};

export type RepoInfoItem = {
  name: string;
  owner: RepoOwner;
  full_name: string;
  description: string;
  language: string | null;
  created_at: string;
  updated_at: string;
};

export type GetRepoInfoParams = {
  owner: string;
  name: string;
};

export interface IGitHubStore {
  getRepoList(params: GetRepoListParams): Promise<ApiResponse<RepoItem[], {}>>;

  getRepoBranches(
    params: GetRepoBranchesParams
  ): Promise<ApiResponse<BranchesItem[], {}>>;

  getRepoInfo(
    params: GetRepoInfoParams
  ): Promise<ApiResponse<RepoInfoItem, {}>>;

  // Необязательный пункт, т.к. требует авторизации. Понадобится в будущем
  postCreateRepo(
    params: PostCreateRepoParams
  ): Promise<ApiResponse<RepoItem[], {}>>;
}
