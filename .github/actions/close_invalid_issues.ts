import { Octokit } from "@octokit/rest";

// Créez une instance d'Octokit
const octokit = new Octokit({
  auth: process.env.ACTION_TOKEN, // Utilisez la variable d'environnement ACTION_TOKEN
});

const owner = 'gologic-ca'; // Remplacez par le propriétaire du dépôt
const repo = 'projet-demo'; // Remplacez par le nom du dépôt

async function closeInvalidIssues() {
  try {
    // Obtenez tous les problèmes du dépôt
    const { data: issues } = await octokit.issues.listForRepo({
      owner,
      repo,
      state: 'open',
    });

    // Parcourez chaque problème
    for (const issue of issues) {
      // Vérifiez si le problème a un label "invalid"
      if (issue.labels.some(label => label.name === 'invalid')) {
        // Fermez le problème
        await octokit.issues.update({
          owner,
          repo,
          issue_number: issue.number,
          state: 'closed',
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
}

// Exécutez la fonction
closeInvalidIssues();
