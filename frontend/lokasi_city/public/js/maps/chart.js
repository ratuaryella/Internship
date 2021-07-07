.chart-wrap{
    margin-left:50px;
    font-family:sans-serif;
    .title{
      font-weight:bold;
      font-size:1.62em;
      padding:0.5em 0 1.8em 0;
      text-align:center;
      white-space:nowrap;
    }
    &.vertical .grid{
      transform:translateY(@chart-height/2 - @chart-width/2) translateX(@chart-width/2 - @chart-height/2) rotate(-90deg);
      
      
      .bar::after{
        transform: translateY(-50%) rotate(45deg);
        display: block;
      }
      &::before,&::after{
        transform:translateX(-0.2em) rotate(90deg);
      }
    }
    
    height:@chart-width;
    width:@chart-height;
    .grid{
      position:relative;
      padding:5px 0 5px 0;
      height:100%;
      width:100%;
      border-left:2px solid @grid-color;
      
      background:repeating-linear-gradient(90deg,transparent,transparent 19.5%,fadeout(@grid-color,30%) 20%);
      
      &::before{
        font-size:0.8em;
        font-weight:bold;
        content:'0%';
        position:absolute;
        left:-0.5em;
        top:-1.5em;
      }
      &::after{
        font-size:0.8em;
        font-weight:bold;
        content:'100%';
        position:absolute;
        right:-1.5em;
        top:-1.5em;
      }
     }
    
    
    
    .bar {
      width: var(--bar-value);
      height:@bar-thickness;
      margin:@bar-spacing 0;    
      background-color:@bar-color;
      border-radius:0 @bar-rounded @bar-rounded 0;
      
      &:hover{
        opacity:0.7;
      }
      
      &::after{
        content:attr(data-name);
        margin-left:100%;
        //line-height:@bar-thickness;
        padding:10px;
        display:inline-block;
        white-space:nowrap;
      }
    }
    
   
  }
  