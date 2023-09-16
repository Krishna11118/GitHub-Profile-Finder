class GitHub {
  constructor() {
    this.form = document.getElementById("form");
    this.input = document.getElementById("search");
    this.card = document.getElementById("card");

    this.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = this.input.value.trim();

      if (username) {
        await this.getUserDetails(username);
      }
    });

    // Initialize with a default GitHub username
    this.getUserDetails("octocat");
  }

  async getUserDetails(username) {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        throw new Error("GitHub API request failed");
      }

      const userData = await response.json();
      this.createUserCard(userData);
    } catch (error) {
      console.error("Error:", error);
      this.card.innerHTML = "<p>User not found.</p>";
    }
  }

  createUserCard(user) {
    this.card.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" />
          <div>
              <h2>${user.name || user.login}</h2>
              <p>${user.bio || "No bio available"}</p>
              <div class="intro">
              <table>
              <tr>
                  <td>Followers:${user.followers || "Not available"} </td>    
                 <td>Following: ${user.following || "Not available"}  </td>
                  <td>Repos: ${user.public_repos || "Not available"}  </td>
              </tr> 
                     <td>Twitter: ${user.twitter_username || "Null"}</td>
                     <td> </td>
                     <td>Location:${user.location || "Not available"}</td>
              </tr>    

              
          </table>
              </div>
          </div>
      `;
  }
}

new GitHub();
