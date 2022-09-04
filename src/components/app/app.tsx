import { component$ } from '@builder.io/qwik';
import { ButtonBunch } from '../button-bunch/button-bunch';
import { RandomPhotos } from '../random-photos/random-photos';

export const App = component$(() => {
  
  return (
    <div>
      <h1>Buttons and Photos</h1>
      
      <ButtonBunch buttonCount={50} />
      
      <RandomPhotos imageCount={25} />

    </div>
  );
});
