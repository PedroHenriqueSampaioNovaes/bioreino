'use client';

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import useScrollEnd from './useScrollEnd';

interface IDistanceElementRef {
  targetAnchorElement: Element | null;
  distanceFromTopOfElement: number;
  distanceFromBottomOfTheElement: number;
}

interface IUseHighlightIndexWhenScrollProps {
  listElementId: string[];
  scrollInUse?: boolean;
  setScrollInUse?: Dispatch<SetStateAction<boolean>>;
}

export default function useHighlightIndexWhenScroll(
  {
    listElementId,
    scrollInUse = false,
    setScrollInUse,
  }: IUseHighlightIndexWhenScrollProps,
  headerId: string = ''
) {
  const listElementPositionsRef = useRef<IDistanceElementRef[]>([]);

  useScrollEnd(() => setScrollInUse?.(false), 100);

  const configureDetailsOfTheElements = useCallback(() => {
    const header = document.getElementById(headerId);
    const headerHeight = header ? header.getBoundingClientRect().height : 0;

    const elements = listElementId.map((id) => document.getElementById(id));
    const listElementDetails = elements.map((element) => {
      if (!element) {
        console.warn(`Element with id ${element} not found.`);
        return {
          targetAnchorElement: null,
          distanceFromTopOfElement: 0,
          distanceFromBottomOfTheElement: 0,
        };
      }

      // Get the top and bottom position of the element relative to the viewport
      const sectionTop = element.getBoundingClientRect().top;
      const topOfElement = sectionTop + window.scrollY - headerHeight;

      return {
        targetAnchorElement: document.querySelector(`[href="#${element.id}"]`),
        distanceFromTopOfElement: Math.ceil(topOfElement),
        distanceFromBottomOfTheElement: Math.ceil(
          topOfElement + element.offsetHeight
        ),
      };
    });

    listElementPositionsRef.current = listElementDetails;
  }, [headerId, listElementId]);

  const activeIndex = useCallback(() => {
    if (scrollInUse) return;

    const visibleElement = listElementPositionsRef.current.find(
      (element) =>
        window.scrollY >= element.distanceFromTopOfElement &&
        window.scrollY < element.distanceFromBottomOfTheElement
    );

    // Remove the active class from the previous anchor link
    listElementPositionsRef.current.forEach((el) => {
      el.targetAnchorElement?.classList.remove('active');
    });

    // Remove and add the index highlight
    if (visibleElement?.targetAnchorElement) {
      listElementPositionsRef.current.forEach((element) => {
        element.targetAnchorElement?.classList.remove('active');
      });
      visibleElement.targetAnchorElement.classList.add('active');
    }
  }, [scrollInUse]);

  useEffect(() => {
    configureDetailsOfTheElements();
    activeIndex();

    const handleResize = () => {
      configureDetailsOfTheElements();
      activeIndex();
    };

    window.addEventListener('scroll', activeIndex);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', activeIndex);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeIndex, configureDetailsOfTheElements]);

  return null;
}
