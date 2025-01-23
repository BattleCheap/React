import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState(""); // Nom d'utilisateur
  const [name, setName] = useState(""); // Nom
  const [age, setAge] = useState(""); // Âge
  const [address, setAddress] = useState(""); // Adresse
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          name,
          age,
          address,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Une erreur s'est produite");
      }

      alert("Inscription réussie !");
      navigate("/login"); // Redirige vers la page de connexion
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBack = () => {
    navigate("/"); // Retourne à la page d'accueil
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Créer un compte</h1>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "0 auto", textAlign: "left" }}
      >
        {error && (
          <div
            style={{
              color: "red",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="username"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Nom d'utilisateur :
          </label>
          <input
            type="text"
            id="username"
            placeholder="Entrez votre nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="name"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Nom :
          </label>
          <input
            type="text"
            id="name"
            placeholder="Entrez votre nom complet"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="age"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Âge :
          </label>
          <input
            type="number"
            id="age"
            placeholder="Entrez votre âge"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="address"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Adresse :
          </label>
          <input
            type="text"
            id="address"
            placeholder="Entrez votre adresse"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Email :
          </label>
          <input
            type="email"
            id="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Mot de passe :
          </label>
          <input
            type="password"
            id="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="confirm-password"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Confirmez le mot de passe :
          </label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirmez votre mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
            required
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            type="button"
            onClick={handleBack}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#f5f5f5",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            Retour
          </button>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#4caf50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
