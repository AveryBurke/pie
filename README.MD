# Pie
![char](./Screen%20Shot%202023-10-18%20at%202.24.23%20PM.png)
Pie is a proof of concept data visualization app that simplifies the creation of bullseye plots from tabular data. It is an intuitive and user-friendly alternative to existing tools, like [the one in Excel](https://www.journalofaccountancy.com/issues/2016/jul/excel-bulls-eye-chart.html).

For a live demo, you can [visit the app here](https://averyburke.github.io/pie/).
# What is a Bullseye Plot?
A bullseye plot is a type of data visualization that represents data in concentric rings and slices, making it easy to compare data points across different categories. Pie takes tabular data and automatically generates an interactive bullseye plot that you can easily customize.

This demo uses a mocked data set generated with [faker.js](https://fakerjs.dev/). You can imagine a spreadsheet of user data that looks like this:

<table>
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Subscription Tier</th>
    <th>Building Number</th>
    <th>Chirality</th>
  </tr>
  <tr>
    <td>Moses Schönfinkel</td>
    <td>Combinators@thingsInventedByMe.com</td>
    <td>Buisness</td>
    <td>1</td>
    <td>Left Handed</td>
  </tr>
  <tr>
    <td>...</td>
    <td>...</td>
    <td>...</td>
    <td>...</td>
    <td>...</td>
  </tr>
</table>

# Features

1. **Interactive Customization**: Pie allows you to customize your bullseye plot in various ways, including selecting the columns that determine the chart's slices and rings.
1. **Data Representation**: The rows of the mock data (representing users) are visualized as circles and sorted into their respective slices and rings using a variation on [Llyod’s algorithm](https://en.wikipedia.org/wiki/Lloyd%27s_algorithm) optimized to run on the your GPU.  This way hundreds of circles can be placed efficiently, sorted and resorted, in real time.
1. **Color Coding**: You can choose a specific column to determine the color coding of each circle, making it easier to differentiate data points.
1. **Filtering**: Select a column against which to filter your data, focusing on specific subsets of the dataset.
1. **Shuffling**: To aid in exploring the data, you can shuffle the order of the slices, rings, and colors

# Getting Started

1. [Visit the app](https://averyburke.github.io/pie/)
1. When the page loads, a random data set containing between 30 and 500 users is generated and columns for the chart’s slices, rings and color coding are randomly selected.
1. To customize the chart, use the control panels on the sidebar:
    * **change encoding order**: Rearrange the slices, rings, and color encodings by dragging the items in the control panel.
    * **select new columns**: Use the dropdown menus to choose new columns for these encodings.
    * **filter data**: select a column against which to filter the data, using the drop down, and use the check boxes to select values to filter out

