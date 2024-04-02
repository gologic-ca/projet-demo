const { Octokit } = require("@octokit/rest");

// Créez une instance d'Octokit
const octokit = new Octokit({
  auth: process.env.ACTION_TOKEN, // Utilisez la variable d'environnement ACTION_TOKEN comme token GitHub
});

async function closeInvalidIssues() {
  let page = 1;
  while (true) {
    // Récupère les problèmes
    const { data: issues } = await octokit.issues.listForRepo({
      owner: "gologic-ca", // Remplacez par le nom du propriétaire du repo
      repo: "project-demo", // Remplacez par le nom du repo
      state: "open",
      labels: "invalid",
      per_page: 100,
      page,
    });

    // Si il n'y a plus de problèmes, on arrête la boucle
    if (issues.length === 0) {
      break;
    }

    // Parcourir chaque problème et le fermer
    for (const issue of issues) {
      await octokit.issues.update({
        owner: "nom_du_proprietaire", // Remplacez par le nom du propriétaire du repo
        repo: "nom_du_repo", // Remplacez par le nom du repo
        issue_number: issue.number,
        state: "closed",
      });
    }

    // Passer à la page suivante
    page++;
  }
}

// Exécute la fonction
closeInvalidIssues().catch(console.error);
