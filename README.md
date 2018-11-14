# Data-Processing
## About
This javascript file (and accompanying html file) was made to fetch data from data.ct.gov and consolidate it to a format that was usable in graphs.

Specifically, it was used to create the pie chart on thefatdads.github.io.

## The Code
To fetch data from data.ct.gov, the REST api was used. The REST api only allows for the fetching of 1000 data points at a time. Therefore, with data for greater than 1000 points, an offset is neccesary.

```
https://data.ct.gov/resource/deaths.json?$offset=STARTINGVALUE
```

Therefore, we iterated over each offset of the data and downloaded them individually, and then consolidated the data to count the amount of deaths resulting from each drug.

Thought it hasn't been abstracted to work with any dataset, it would be very easy to take this data and do so.
