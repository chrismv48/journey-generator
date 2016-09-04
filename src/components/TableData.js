var tableData = [
  {
    field: null,
    label: "Name",
    align: null,
    sortable: false,
    contentType: "location",
    fixed: true,
    isVisible: true,
    width: 110
  },
  {
    field: "population_label",
    label: "Population",
    align: "center",
    sortable: true,
    contentType: "rating",
    filterType: "rating",
    sliderMin: 0,
    sliderMax: 300,
    sliderStep: 10,
    fixed: false,
    isVisible: true
  },
  {
    field: "avg_price",
    label: "Avg Daily Price",
    align: "center",
    sortable: true,
    contentType: "dollar",
    filterType: "slider",
    sliderMin: 0,
    sliderMax: 300,
    sliderStep: 10,
    fixed: false,
    isVisible: true
  },
  {
    field: "weather_index_label",
    label: "Weather",
    align: "center",
    sortable: true,
    contentType: "rating",
    filterType: "rating",
    iconName: "fa fa-sun-o fa-lg",
    sliderMin: 0,
    sliderMax: 1,
    sliderStep: 0.1,
    fixed: false,
    isVisible: true
  },
  {
    field: "safety_score_label",
    label: "Safety Score",
    align: "center",
    sortable: true,
    contentType: "rating",
    filterType: "rating",
    iconName: "fa fa-hand-peace-o fa-lg",
    fixed: false,
    isVisible: true
  },
  {
    field: "attractions_score",
    label: "Attractions",
    align: "center",
    sortable: true,
    contentType: "rating",
    filterType: "rating",
    selectedColor: "#0588f9",
    iconName: "fa fa-camera-retro fa-lg",
    fixed: false,
    isVisible: true
  },
  {
    field: "culture_score",
    label: "Culture",
    align: "center",
    sortable: true,
    contentType: "rating",
    filterType: "rating",
    selectedColor: "#56ab56",
    iconName: "fa fa-globe fa-lg",
    fixed: false,
    isVisible: true
  },
  {
    field: "dining_score",
    label: "Dining",
    align: "center",
    sortable: true,
    contentType: "rating",
    filterType: "rating",
    selectedColor: "#f9a126",
    iconName: 'fa fa-cutlery fa-lg',
    fixed: false,
    isVisible: true
  },
  {
    field: "nightlife_score",
    label: "Nightlife",
    align: "center",
    sortable: true,
    contentType: "rating",
    filterType: "rating",
    selectedColor: "#d9534f",
    iconName: 'fa fa-glass fa-lg',
    fixed: false,
    isVisible: true
  },
  {
    field: "shopping_score",
    label: "Shopping",
    align: "center",
    sortable: true,
    contentType: "rating",
    filterType: "rating",
    selectedColor: "#a742a9",
    iconName: 'fa fa-shopping-bag fa-lg',
    fixed: false,
    isVisible: true
  }
];

export default tableData;
