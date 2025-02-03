import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; // Asegúrate de tener la ruta correcta para tu CSS


const Home = () => {
  
  return (
    <div className="home-container">

      {/* Main Content */}
      <main className="home-main">
      <div className="background-container">
  <img src="almacen_darker.webp" alt="Background" className="background-image" />
  <div className="overlay-logo">
    <img src="LogoBlancoSobreNegro.png" alt="Logo" className="overlay-image" />
    <h2 className="home-title">ThreeLogics</h2>
  </div>
</div>

        
        <h2>¡Hola! Bienvenido a nuestra plataforma</h2>
        <p>Explora nuestra aplicación. Regístrate o inicia sesión desde el menú superior.</p>
        <p>Gestiona tu inventario de manera eficiente con ThreeLogics.</p>
        <div className="about-container">
  <div className="about-left">
    <h2>Sobre</h2>
    <h3>ThreeLogics</h3>
    <table className="about-table">
      <tbody>
        <tr>
          <td>Industria</td>
          <td>Logistica</td>
        </tr>
        <tr>
          <td>Localización</td>
          <td>España</td>
        </tr>
        <tr>
          <td>Año</td>
          <td>2025</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="about-right">
    <p>
      An innovative smart warehouse platform that revolutionizes inventory
      handling with advanced automation and data analytics. It enables
      businesses to manage stock levels, optimize storage, and track shipments
      effortlessly, ensuring a smooth and efficient warehouse experience.
    </p>
  </div>
</div><div class="infographic-container">
  <div class="description-and-tags">
    <p class="infographic-description">
      Throughout the project lifecycle, we navigated multiple stages, starting
      with comprehensive research and moving through to the detailed design
      and development phases. At each juncture, we performed rigorous
      evaluations to prioritize user-friendly interfaces and cohesive user
      experiences, ensuring the project met all objectives and user
      expectations.
    </p>

    <div class="tags-container">
      <div class="tag">Mobile App</div>
      <div class="tag">UI Design</div>
      <div class="tag">Concept</div>
      <div class="tag">UX Design</div>
      <div class="tag">Branding</div>
      <div class="tag">Visual Design</div>
    </div>
  </div>

  <div class="stats-container">
    <div class="stat">
      <h2>10+</h2>
      <p>Main Screen</p>
    </div>
    <div class="stat">
      <h2>45</h2>
      <p>Days Project Duration</p>
    </div>
    <div class="stat">
      <h2>24+</h2>
      <p>Respondents Surveyed</p>
    </div>
    <div class="stat">
      <h2>6</h2>
      <p>Team Members Involved</p>
    </div>
  </div>
</div>
<div class="challenges-container">
  <h1 class="challenges-title">Identifying Challenges and Solutions</h1>
  <div class="challenges-cards">
 
    <div class="challenge-card">
      <div class="card-header">
        <div class="icon problem-icon">✖️</div>
        <span class="card-type">Problem</span>
      </div>
      <h3 class="card-title">Inefficient Inventory Management</h3>
      <p class="card-description">
        Managing inventory manually leads to errors, stockouts, and overstocking, causing operational inefficiencies and increased costs.
      </p>
      <div class="card-list">
        <h4>Problem list</h4>
        <ul>
          <li>Inaccurate Inventory Counts</li>
          <li>Delayed Order Fulfillment</li>
          <li>Inefficient Space Utilization</li>
        </ul>
      </div>
    </div>

   
    <div class="challenge-card">
      <div class="card-header">
        <div class="icon solution-icon">🔍</div>
        <span class="card-type">Solution</span>
      </div>
      <h3 class="card-title">Automated Inventory Tracking</h3>
      <p class="card-description">
        Implementing automated inventory tracking systems reduces manual errors, provides real-time stock updates, and optimizes inventory levels to enhance efficiency and reduce costs.
      </p>
      <div class="card-list">
        <h4>Problem list</h4>
        <ul>
          <li>Real-Time Inventory Tracking</li>
          <li>Streamlined Order Processing</li>
          <li>Optimized Warehouse Layout</li>
        </ul>
      </div>
    </div>
  </div>
</div>
<div class="instagram-posts-container">
<img src="1.png" alt="post" className="instagram-post" />
<img src="2.png" alt="post" className="instagram-post" />
<img src="3.png" alt="post" className="instagram-post" />
</div>
<div class="full-width-image-container">
  <img src="4.png" alt="Full Width Image" class="full-width-image" />
</div>
<div className="persona-container">
      <div className="persona-header">
        <h1>Key User´s</h1>
        <p>
        Perfiles de usuarios representativos diseñados para guiar el proceso de desarrollo. Esta sección incluye información demográfica, necesidades, objetivos y comportamientos de los usuarios, lo que ayuda a adaptar el proyecto para satisfacer los requisitos de los usuarios.        </p>
      </div>

      <div className="persona-profile">
        <div className="persona-image">
          <img src="5.png " alt="Nadya Siagian" />
        </div>

        <div className="persona-details">
          <div className="persona-tags">
            <span className="tag">23 años</span>
            <span className="tag">Backend Manager</span>
          </div>
          <h2>Adrian Vaquero</h2>
          <p>
            Nadya manages daily operations at the frontline of a rental warehouse. She struggles with inefficient inventory tracking and communication issues, which hinder her ability to maintain smooth warehouse operations and respond to tenant needs effectively.
          </p>
          <h3>Problem List</h3>
          <ul>
            <li>✔️ Inefficient Inventory Tracking</li>
            <li>✔️ Poor Communication Channels</li>
            <li>✔️ Limited Access to Real-Time Data</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="flujo-container">
  <img src="flujo.png" alt="flujo" class="flujo-image" />
</div>
<div className="persona-container-2">
       <div className="persona-profile-2">
        <div className="persona-image-2">
          <img src="5.png " alt="Nadya Siagian" />
        </div>

        <div className="persona-details-2">
          <div className="persona-tags-2">
            <span className="tag-2">20 años</span>
            <span className="tag-2">Frontend Manager</span>
          </div>
          <h2>Iker Domínguez</h2>
          <p>
            Nadya manages daily operations at the frontline of a rental warehouse. She struggles with inefficient inventory tracking and communication issues, which hinder her ability to maintain smooth warehouse operations and respond to tenant needs effectively.
          </p>
          <h3>Problem List</h3>
          <ul>
            <li>✔️ Inefficient Inventory Tracking</li>
            <li>✔️ Poor Communication Channels</li>
            <li>✔️ Limited Access to Real-Time Data</li>
          </ul>
        </div>
      </div>
    </div>

      </main>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2025 Mi Aplicación. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;