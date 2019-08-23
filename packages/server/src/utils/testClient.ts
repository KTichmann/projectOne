import * as rp from "request-promise";

export class TestClient {
	url: string;
	options: {
		jar: any;
		json: boolean;
		withCredentials: boolean;
	};
	constructor(url: string) {
		this.url = url;
		this.options = {
			withCredentials: true,
			json: true,
			jar: rp.jar()
		};
	}

	async register(email: string, password: string, username: string) {
		return rp.post(this.url, {
			...this.options,
			body: {
				query: `
          mutation {
                register(email: "${email}", password: "${password}", username: "${username}"){
                  path
				  message
              }
          }
          `
			}
		});
	}

	async login(email: string, password: string) {
		return rp.post(this.url, {
			...this.options,
			body: {
				query: `
          mutation {
              login(email: "${email}", password: "${password}"){
                  path
                  message
              }
          }
          `
			}
		});
	}

	async me() {
		return rp.post(this.url, {
			...this.options,
			body: {
				query: `
            {
                me {
                    id
                    email
                }
            }
        `
			}
		});
	}

	async logout() {
		return rp.post(this.url, {
			...this.options,
			body: {
				query: `
          mutation {
              logout
          }
          `
			}
		});
	}

	async forgotPasswordChange(newPassword: string, key: string) {
		return rp.post(this.url, {
			...this.options,
			body: {
				query: `
        mutation {
          forgotPasswordChange(newPassword: "${newPassword}", key: "${key}"){
            path
            message
          }
        }`
			}
		});
	}

	async createSnippet(snippet: any) {
		const { content, language, visibility, tags, title, theme } = snippet;
		return rp.post(this.url, {
			...this.options,
			body: {
				query: `
				mutation {
					createSnippet(
					content: "${content}"
					language: "${language}"
					visibility: "${visibility}"
					tags: "${tags}"
					${title ? `title: "${title}"` : ``}
					theme: "${theme}"
				) {
					... on Snippet {
						content
						language
						title
						theme
					}
					... on ContentError {
						error
						message
					}
				}
			}
				`
			}
		});
	}

	async getMySnippets() {
		return rp.post(this.url, {
			...this.options,
			body: {
				query: `{
					getMySnippets{
						content
						language
						title
						theme
					}
				}`
			}
		});
	}
}
