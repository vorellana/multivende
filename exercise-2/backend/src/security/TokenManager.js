class TokenManager {
  constructor() {
    this.token = null;
    this.expiry = null; // <- Nueva propiedad para la fecha de expiración
  }

  setToken(token, expiry) {
    this.token = token;
    this.expiry = expiry;
  }

  async getToken() {
    const now = Date.now();
    if (!this.token || this.expiry <= now) {
      const tokenData = await this.retrieveTokenFromDB();
      this.token = tokenData.token;
      this.expiry = tokenData.expiry; // <- Convertir esto a un timestamp
    }
    return this.token;
  }

  async retrieveTokenFromDB() {
    // Aquí va la lógica para recuperar el token y su fecha de expiración de la base de datos.
    // Esta función debería devolver un objeto con las propiedades 'token' y 'expiry'.
  }

  invalidateToken() {
    this.token = null;
    this.expiry = null;
  }
}

export default new TokenManager();
