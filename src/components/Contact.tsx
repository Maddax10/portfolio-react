export const Contact = () => {
  return (
    <div className="contact__card" id="contact">
      <form method="post" className="contact__form">
        <h1>Contacte-moi</h1>
        <input type="mail" placeholder="Email de contact" />
        <input type="text" placeholder="Sujet" />
        <textarea placeholder="Message"></textarea>
        <button>Envoyer</button>
      </form>
    </div>
  );
};
