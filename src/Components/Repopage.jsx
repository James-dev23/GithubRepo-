// SingleRepoPage.js
import React from 'react';

function SingleRepoPage({ match }) {
  const { repoId } = match.params;

  // Fetch repository details using repoId

  return (
    <div>
      <h2>Repository Details</h2>
      <p>Repository ID: {repoId}</p>
      {/* Display repository details */}
    </div>
  );
}

export default SingleRepoPage;
