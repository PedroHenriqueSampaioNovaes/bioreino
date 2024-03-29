import React from 'react';
import styles from './Item.module.css';
import PropTypes from 'prop-types';
import debounce from 'Components/Helper/debounce';

const Item = ({ scroll, link, text, onAction, setOnAction }) => {
  const [distSectionArray, setDistSectionArray] = React.useState(null);

  const checkDistance = React.useCallback(() => {
    if (distSectionArray) {
      const scrollY = window.scrollY;
      distSectionArray.forEach((distElement) => {
        if (
          scrollY >= distElement.initSize &&
          scrollY < distElement.finalSize
        ) {
          const navIndex = distElement.link;
          navIndex.classList.add('active');
          setOnAction(false);
        } else {
          const navIndex = distElement.link;
          navIndex.classList.remove('active');
        }
      });
    }
  }, [distSectionArray, setOnAction]);

  React.useEffect(() => {
    function getDistanceSections() {
      const links = document.querySelectorAll('[data-indexes] a');
      const header = document.querySelector('header');
      const headerHeight = header.offsetHeight;

      setDistSectionArray(
        [...links].map((link) => {
          const id = link.getAttribute('href');
          const section = document.querySelector(id);
          const initSize = section.offsetTop - headerHeight;
          const finalSize =
            section.offsetTop + section.offsetHeight - headerHeight;

          return { initSize, finalSize, link };
        }),
      );
    }

    function handleResize() {
      getDistanceSections();
      checkDistance();
    }
    const handleResizeDebounce = debounce(handleResize, 100);

    function handleScroll() {
      if (!distSectionArray) getDistanceSections();

      if (onAction) {
        checkDistanceDebounce();
      } else {
        checkDistance();
      }
    }
    const checkDistanceDebounce = debounce(checkDistance, 50);

    window.addEventListener('load', getDistanceSections);
    window.addEventListener('resize', handleResizeDebounce);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('load', getDistanceSections);
      window.removeEventListener('resize', handleResizeDebounce);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [checkDistance, onAction, distSectionArray]);

  return (
    <li className={styles.item}>
      <a onClick={scroll} href={`#${link}`}>
        {text}
      </a>
    </li>
  );
};

Item.propTypes = {
  scroll: PropTypes.func.isRequired,
  onAction: PropTypes.bool.isRequired,
  setOnAction: PropTypes.func.isRequired,
};

export default Item;
