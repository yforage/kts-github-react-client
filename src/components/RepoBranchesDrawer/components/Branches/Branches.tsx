import React, { useEffect, useState } from "react";

import apiEndpoints from "@config/api";
import GitHubStore from "@store/GitHubStore";
import { BranchesItem, RepoInfoItem } from "src/store/GitHubStore/types";

import styles from "./Branches.module.scss";
import BranchItem from "./components/BranchItem";

type BranchesProps = {
  repo: RepoInfoItem | null;
};

const Branches: React.FC<BranchesProps> = ({ repo }) => {
  const [branchesList, setBranchesList] = useState<BranchesItem[]>([]);
  const handleChange = (list: BranchesItem[]) => setBranchesList(list);

  useEffect(() => {
    if (!repo) return;
    const api = new GitHubStore();
    (async () => {
      const response = await api.getRepoBranches({
        owner: repo.owner.login,
        repo: repo.name,
      });
      handleChange(response.success ? response.data : []);
    })();
    return () => handleChange([]);
  }, [repo]);
  if (!repo) return null;
  return (
    <div className={styles.branches}>
      <p className={styles.branches__title}>Branches:</p>
      {branchesList.map((branch) => {
        const href = apiEndpoints.branchLink(
          repo.owner.login,
          repo.name,
          branch.name
        );
        return <BranchItem key={branch.name} name={branch.name} href={href} />;
      })}
    </div>
  );
};

export default Branches;
