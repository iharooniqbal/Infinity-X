var map = L.map('map').setView([20,0],2);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);

let geojsonLayer;

let dataset="population";

function randomData(){

if(dataset==="population")
return Math.floor(Math.random()*1200);

if(dataset==="gdp")
return Math.floor(Math.random()*30000);

if(dataset==="wealth")
return Math.floor(Math.random()*90000);

}

function getColor(v){

if(dataset==="population"){
return v>1000 ? "#7f1d1d" :
v>500 ? "#b91c1c" :
v>200 ? "#ef4444" :
"#fecaca";
}

if(dataset==="gdp"){
return v>20000 ? "#14532d" :
v>10000 ? "#16a34a" :
v>5000 ? "#4ade80" :
"#bbf7d0";
}

if(dataset==="wealth"){
return v>80000 ? "#1e3a8a" :
v>40000 ? "#2563eb" :
v>20000 ? "#60a5fa" :
"#bfdbfe";
}

}

function style(feature){

return{
fillColor:getColor(feature.properties.value),
weight:1,
color:"#222",
fillOpacity:0.8
};

}

function onEachFeature(feature,layer){

layer.on('click',function(){

let name=feature.properties.name;
let value=feature.properties.value;

document.getElementById("countryData").innerHTML=
"<b>"+name+"</b><br>"+dataset+": "+value;

});

}

function loadData(){

fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
.then(res=>res.json())
.then(data=>{

data.features.forEach(f=>{
f.properties.value=randomData();
});

if(geojsonLayer) map.removeLayer(geojsonLayer);

geojsonLayer=L.geoJson(data,{
style:style,
onEachFeature:onEachFeature
}).addTo(map);

});

updateLegend();

}

document.getElementById("dataset").onchange=function(){

dataset=this.value;

loadData();

};

function searchCountry(){

let name=document.getElementById("search").value.toLowerCase();

geojsonLayer.eachLayer(function(layer){

let country=layer.feature.properties.name.toLowerCase();

if(country.includes(name)){

map.fitBounds(layer.getBounds());

}

});

}

function updateLegend(){

const legend=document.getElementById("legend");

legend.innerHTML=`

<b>${dataset} scale</b>

<div class="legend-box">
<div class="legend-color" style="background:#7f1d1d"></div>High
</div>

<div class="legend-box">
<div class="legend-color" style="background:#ef4444"></div>Medium
</div>

<div class="legend-box">
<div class="legend-color" style="background:#fecaca"></div>Low
</div>

`;

}

loadData();