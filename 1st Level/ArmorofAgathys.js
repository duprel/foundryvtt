(() => {
    if (args[0] === "on") {
        let params =
[{
    filterType: "xfire",
    filterId: "myColdXFire",
    time: 0,
    color: 0xBBDDEE,
    blend: 1,
    amplitude: 1,
    dispersion: 0,
    chromatic: false,
    scaleX: 1,
    scaleY: 1,
    inlay: false,
    animated :
    {
      time : 
      { 
        active: true, 
        speed: -0.0015, 
        animType: "move" 
      }
    }
}];

TokenMagic.addUpdateFiltersOnSelected(params);
    } else {
    TokenMagic.deleteFiltersOnSelected();
}
})();