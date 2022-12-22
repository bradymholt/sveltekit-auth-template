<section>
  <div>
    <h1>Start building today!</h1>
    <p>Are you ready to take your building to the next level?</p>
  </div>
  <div>
    <img src="/hero.png" alt="Hero" />
  </div>
</section>

<style lang="postcss">
  p {
    font-size: 2rem;
  }

  section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-shrink: 0;
    width: 100%;

    div {
      align-self: center;
    }
  }

  @media screen and (max-width: 1050px) {
    section {
      flex-direction: column;
    }
  }
</style>
