# Watchit Web Application

## Overview

Watchit is a user-friendly web application that helps users search for movies and TV shows to find out which streaming platforms they are available on. Users can filter results by region (CA, US, GB) to get region-specific availability.

## Features

- **Search Functionality**: Search for any movie or TV show by name.
- **Detailed Availability**: View a list of streaming services where a title is available, with direct links to watch.
- **Region Filtering**: Filter availability by region (CA, US, GB).

## Technologies Used

- **Frontend**: React and Tailwind CSS
- **Backend/API**: [Watchmode API](https://www.watchmode.com/api/)
- **Styling**: Tailwind CSS with custom font integration

## Usage

Navigate to https://watchit-silk.vercel.app/ in a web browser.

1. Use the search bar to enter the name of a movie or TV show and press **Enter**.
2. Browse the search results displayed on the left-hand side.
3. Click on a title to view streaming sources on the right-hand side.
4. Use the **Region** button to select your preferred region (CA, US, GB).
5. If no sources are available for a selected title in your region, a message will be displayed.

## Known Issues

- The application currently does not support pagination for long lists of search results.
- Some API responses might return titles with incomplete data (e.g., missing streaming links).

## Future Enhancements

- Add pagination for large search result lists.
- Expand region selection to include more countries.
- Improve UI and show more details for search results.

## Acknowledgments

- [Watchmode API](https://www.watchmode.com/api/) for providing movie and TV show data.
- [Tailwind CSS](https://tailwindcss.com/) for efficient styling.

---

Thank you for using Watchit! If you encounter any issues or have suggestions for improvement, feel free to reach out.

## Learn More About Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)
