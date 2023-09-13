import React from 'react';
import styles from './DashboardFilter.module.css';
import { ReactComponent as Arrow } from '../../Assets/seta.svg';
import { CATEGORIES_GET } from '../../api';
import { UserContext } from '../../Context/UserContext';

import DashboardFilterPlan from './Filters/DashboardFilterPlan';
import DashboardFilterCategories from './Filters/DashboardFilterCategories';

const DashboardFilter = ({ filter, setFilter }) => {
  const [categories, setCategories] = React.useState([]);
  const { data } = React.useContext(UserContext);

  React.useEffect(() => {
    async function getCategories() {
      const token = localStorage.getItem('token');

      const { url, options } = CATEGORIES_GET(token);

      const responseCourses = await fetch(url, options);
      const json = await responseCourses.json();

      setCategories(json);
    }
    getCategories();
  }, []);

  const filteredCategories = getFilteredCategories(categories, filter);

  function handleFilter({ target }) {
    if (target.name === 'plans') {
      if (data.plan === 'scholar' && target.value === 'professional') return;
      setFilter({ ...filter, plan: target.value });
    } else {
      setFilter({ ...filter, category: target.value });
    }
  }

  return (
    <div className={styles.filter}>
      <p>Filtrar por</p>
      <DashboardFilterPlan
        filter={filter}
        setFilter={setFilter}
        handleFilter={handleFilter}
        user={data}
      />
      <Arrow />
      <DashboardFilterCategories
        filter={filter}
        filteredCategories={filteredCategories}
        handleFilter={handleFilter}
      />
    </div>
  );
};

export default DashboardFilter;

function getFilteredCategories(categoryList, filter) {
  if (filter.plan === 'scholar') {
    return categoryList.filter((category) => category.plan === 'scholar');
  }
  return categoryList;
}
