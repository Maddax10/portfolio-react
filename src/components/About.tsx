export const About = () => {
  return (
    <section className="about" id="about">
      <div className="about__card">
        <h1 className="about__title">Michon Maximilien</h1>

        <div className="about__description">
          <div className="about__image">
            <img src="/my_shity-face.JPG" alt="Image of me" />
            <div className="about__imageOverlay"></div>
          </div>
          <div className="about__personalTxt">
            <p>Hey, j'ai 27 ans et je suis développeur Front-End junior basé sur Ath, dans le Hainaut.</p>
            <p>J'adore comprendre les choses, bidouiller et mettre en pratique.</p>
            <p>
              Au quotidien j'aime les immersions en VR, l'hardware, les jeux-vidéos <span className="about__little">et une ou deux tasses de thé</span>
            </p>
            <p>Je suis aussi l'heureux propriétaire d'une Ford Fiesta de 2014 ainsi que de mon permis B.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
