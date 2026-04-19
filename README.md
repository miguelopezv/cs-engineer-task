# Bug Explanations

- **Blank Page**: Caused because the `LineChart.tsx` component was importing `LineElement` from the `chart.js` dependency but it was not being registered on `ChartJs.Register()`, this element is needed to draw lines between points in the graph. Since there's no error boundary on the app to handle this error, it crashes the entire app when trying to render it.

- **Inverted Data**: on `LineChart.tsx` the data is being mapped and multiplied by `-100`, wich inverts the data and displays it in negative values. removing the multiplication and just returning the `orders` property without doing anything else will display the correct data.

- **Color Palette**: on `Piechart` we have 4 different categories but only 3 `backgroundColor` and `borderColor` are defined, wich results in `breakfast` and `lateDinner` sharing the same color and that makes the graph confusing. Adding a fourth color improves the readability of the chart.

- **Unused Data**: there's a `JSON` on the `Data` folder that is not being used (`RevenuePerDay.json`), although not a breaking bug, is dead code and can be remove just to improve the developer's life and the debugging and readability of the project.

- **Labels in Lowercase**: the labels on `PieChart` are lowercase, they should be capitalized to keep consistency with the other graps on the dashboard.

- **Data Inconsistency**: May not be a bug but data is inconsistent between `OrdersPerDay` and `OrdersByStationPerDay`.

- **Issues With Dates**: On most components the dates were rendered using `toLocaleDateString`, is a better option to use `Intl.DateTimeFormat` in terms of performance, also creating a formatter utility and importing it wherever needed allows us to change only one file in case the format of the date needs to be changed. Also, since we are not passing the timezone on the formatter there's a slight chance that a user in a negative timezone (`-5 UTC`) may seen the data as the day before, this has been fixed on `utils/dateFormatter.tsx`.

- **Bubbles Without Totals**: on `BubbleChart` if a total was `0`, `station/total * 100` will return `NaN` nad display incorrect data. If `total <= 0` now returns `0`, and `pctToRadius` ensure that pct `isFinite` or falls back to a safe radius if not.

- **X-axis on BubbleChart:** on `BubbleChart` if there's no result then there's no way to calculate min and max on the x-axis, which could result in a rendering error.

# Feature implementation summary:

I added a native `<select>` in `BarChart` populated by a mapped options list, with `All Seatings` to display all datasets and breakfast, lunch, first dinner, and second dinner to filter each one. The selected value is stored in component state and updated through `onChange`. The chart data comes from the selection: when `All Seatings` is chosen it renders every dataset together (and stacked) with the legends on top, and when a specific seating is chosen it renders only that dataset. I also used `useMemo` for values like labels, seating options and datasets so the filter logic stays efficient avoiding calculations between renders.

# Written Reflection

- **Error Boundary:** Create a common component (with `getDerivedStateFromError` and `componentDidCatch`, or use a library like `react-error-boundary`) that is able to catch a possible error in rendering like the one on `LineChart.tsx`, logs the error and displays a `Fallback UI` so that the entire app is rendered instead of showing a blank page.

- **Barrel Import:** (Already fixed in code) not a game-changing feature, but since we have so many imports from components folder on `App.tsx`, we can create an `index.ts` file that imports and exports all components, that way we can import all four components in one line at `App.tsx`.

- **Data Validation:** Each chart is receiving the JSON and assuming that the data is correct, it would be a good idea to add a normalization layer in between that allows us to validate and transform the data into an interface or type, any format that ensures that there are not going to be any kind of bugs related to the data itself (malformed values, missing items, etc). Also allowing us to do all the security checks in one place instead of every component, which could be repetitive.

- **Testing**: Adding tests would allow us to ensure that every component is working as expected, not only when handling the expected data but also when dealing with edge cases (like the 0 total on `BubbleChart.tsx`, empty arrays).
