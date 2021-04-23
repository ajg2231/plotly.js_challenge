function UNO(samp) {
    d3.json("samples.json").then((data) =>{

        var samp1 = data.samples;
        var samp2= samp1.filter(key=> key.id == samp);
        var samp3 = samp2[0];
        var samp4 = samp3.sample_values;
        var samp5 = samp3.otu_ids;
        var samp6 = samp3.otu_labels;

        a = samp5.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        var b1 = {
            title: "Top 10",
            xaxis: {title: "Value"},
            yaxis: {title: "ID"},
            margin: {t:35, l:115}
        };

        var b2 = [
            {
                y: a,
                x: samp4.slice(0, 10).reverse(),
                text: samp6.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h"
            }
        ];

        Plotly.newPlot("bar", b2, b1);

        var b3 = {
            xaxis: {title: "ID"},
            hovermode: "closest",
        };

        var b4 = [
            {
                x: samp5,
                y: samp4,
                text: samp6,
                mode: "markers",
                marker: {
                    color: samp5,
                    size: samp4,
                }
            }
        ]

        Plotly.newPlot("bubble", b4, b3);


        var medat = data.metadata;
        var me2 = medat.filter(meta => meta.id ==samp)
        var me3 = me2[0];
        var me4 = d3.select("#sample-metadata");

        me4.html("");

        Object.entries(me3).forEach(([keys, value]) =>{
            me4.append("h6").text(`${keys.toUpperCase()} : ${value}`);



        var gad = [
            {
                domain: {
                    x: [0,1],
                    y: [0,1]
                },
                value: me3.wfreq,
                title: {text: "frequency"},
                type: "indicator",
                mode: "gauge+number",
                gauge: {

                    axis: {range: [0, 9]},
                    steps: [
                        {range: [0,1], color: "yellow"},
                        {range: [1,2], color: "blue"},
                        {range: [2,3], color: "green"},
                        {range: [3,4], color: "pink"},
                        {range: [4,5], color: "red"},
                        {range: [5,6], color: "purple"},
                        {range: [6,7], color: "brown"},
                        {range: [7,8], color: "maroon"},
                        {range: [8,9], color: "teal"},
                        ]}
            }
        ];
        var gal = {
            width:600,
            height: 500,
            margin: { t: 0, b: 0}
        };
        Plotly.newPlot("gauge", gad, gal);

    });
});
};
