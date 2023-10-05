import CategoryChart from "./CategoryChart";

function CategoriesCharts(props) {
  try {
    return (
      <>
        {props.categories.map((category, index) => {
          return <CategoryChart key={index} id={category.props.category.id} name={category.props.category.name} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} toast={props.toast} navigate={props.navigate} />;
        })}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default CategoriesCharts;
