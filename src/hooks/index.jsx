import React from 'react';
import PropTypes from 'prop-types';

import { AuthProvider } from './auth';
import { SearchProvider } from './search';
import { RecipeProvider } from './recipes';
import { SingleRecipeProvider } from './singleRecipe';
import { CookProvider } from './cook';
import { ExploreProvider } from './explore';

function AppProvider({ children }) {
  return (
    <AuthProvider>
      <RecipeProvider>
        <SingleRecipeProvider>
          <SearchProvider>
            <CookProvider>
              <ExploreProvider>
                {children}
              </ExploreProvider>
            </CookProvider>
          </SearchProvider>
        </SingleRecipeProvider>
      </RecipeProvider>
    </AuthProvider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
};

export default AppProvider;
