# Web Development Project 5 - *Houston Brewery Dashboard*

Submitted by: **Fiyinfoluwa Somorin**

This web app: **displays a live dashboard of Houston breweries using data from the Open Brewery DB API. Users can view summary statistics, search breweries by name or address, and filter the dashboard by brewery type.**

Time spent: **6** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard displays 10 unique Houston breweries, one per row
  - Each row includes multiple features such as the brewery name, address, location, type, phone number, and website availability
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data**
  - The app dashboard includes summary statistics for:
    - the total number of breweries currently displayed
    - the number of unique brewery types in the filtered results
    - the number of breweries with websites listed
    - the number of micro breweries in the filtered results
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar correctly filters breweries by name or address
  - The list of results dynamically updates as the user types into the search bar
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items by brewery type, which is different from the search bar
  - The filter correctly updates the dashboard to only show matching brewery types
  - The dashboard list dynamically updates as the user adjusts the filter

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types
  - A text input is used for search and a dropdown menu is used for brewery type
- [ ] The user can enter specific bounds for filter values

The following **additional** features are implemented:

* [x] Friendly user-facing labels were added for brewery types to make the dashboard easier to understand
* [x] Website availability and phone formatting were added to make each row more useful
* [x] Responsive styling was added so the dashboard works on both desktop and mobile screens

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='./Untitled.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with CloudConvert.

## Notes

One challenge was that the original event API plan depended on an API key that did not work for the endpoint being used. To keep the project functional and aligned with the assignment requirements, the app was switched to a public API that reliably returned live Houston data. Another challenge was making technical brewery type labels easier for users to understand, so custom display labels were added for clarity.

## License

    Copyright 2026 Fiyinfoluwa Somorin

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
