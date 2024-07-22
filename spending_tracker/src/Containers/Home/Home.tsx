import "./Home.scss";

type HomeProps = {
  userId: string;
};

const Home = (HomeProps: HomeProps) => {
  return (
    <div>
      <p>Home</p>;<p>user id : {HomeProps.userId}</p>;
    </div>
  );
};

// add a payment
// analytics
// settings
// monthly spend graph
// in budget out of budget

export default Home;
