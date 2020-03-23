# ConcertHunt


Finding concerts for your favorite artists coming soon!


## Description


A website that allows you to search the names of your favorite artists and look up their upcoming concerts. The starting page shows the current top artists retrieved from Last.fm, as well as images from BandsInTown. The search bar lets you search for artist names and brings up their bio, most popular albums, and upcoming concerts. 
<p></p>
Providing an all-in-one platform to search for concerts for your favorite artists and easily purchase concert tickets

Includes:
- artists
- artist genre
- artist info
- albumn pictures
- social media links to artist
- upcoming concerts
- links to purchase concert tickets


## Motivation


We wanted to come up with a database retriever that lets people quickly gather information on their favorite artists and their upcoming concerts.  The page provides links at the bottom of the page to other pages where you can buy tickets for their concerts.


## Wireframes & Color Palette

![](/assets/images/Concert-Hunt.PNG)

![](/assets/images/Project-1-Rough-Draft-1.jpg)

![](/assets/images/Project-1-Rough-Draft-2.jpg)

![](/assets/images/Color-Palette.PNG)


## Technologies Used


- BandsInTown API (https://www.bandsintown.com/en)
    - Artist images
    - Upcoming concerts
- Last.fm API (https://www.last.fm/)
    - Artist biography
    - Most popular albums
- HTML5
- CSS
- JavaScript / jQuery
- Moment.js
- Foundation.js (replaces BootStrap)


## User Story


GIVEN I want to attend my favorite artists concerts
WHEN I search for the artist
THEN I want to receive relevant artists info
WHEN I click on the artist
THEN I want to go to the artist's info page
WHEN I am on the artist's info page
THEN I can view if the artist has an upcoming concerts
WHEN the artist has an upcoming concert performance
THEN I receive concert info and a link to purchase tickets


## Challenges & Successess


- Challenges
    - Figuring out what APIs to use
        - Spotify, iTunes, Deezer, etc. were all deemed too high-level at this point
        - The APIs we did use did not provide all the necessary info
            - We had to combine info from both APIs we used (Last.FM and BandsInTown)
    - Making our code work when every possible link is clicked
        - Ran into several conflicts and/or bugs during development
    - Time constraints - insufficient time to do everything we wanted with the program
    - Remote Collaboration was very new to us, we had to adjust quickly to meet deadlines
- Successes
    - We got our home page to work and lead to another in-site page as well as several external sites
    - The search bar works as intended, as well as clicking on the top artists on the home page


## Directions for Future Development

- Use an API for streaming songs directly within our website instead of relying on external sites
- Use IP address geolocation for locating concerts near a user’s device
- Add more concert information for the end user
- Add customer reviews for each artist’s concerts
- Put in a “Contact us” page for users to email us


## GitHub Repository URL


[GitHub Repository URL](https://github.com/tomaspz/concerthunt)


## Deployed ConcertHunt App URL


[Deployed ConcertHunt App URL](https://tomaspz.github.io/concerthunt/)


