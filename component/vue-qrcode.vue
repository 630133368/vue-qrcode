<template>
    <div>
        <canvas class="vue-qrcode-canvas" ref="canvas"/>
    </div>
</template>
<script>
import QRCode from './src/qrcode';
export default {
    name: 'vue-qrcode',
    data() {
        return {
            config: {
                width: 100,
                height: 100,
                background: '#fff',
                correctLevel: 2,
                foreground: "#000000",
                render: "canvas",
                text: "http://www.baidu.com",
                typeNumber: 0,
                imgSrc: '',
            },
            ctx: null,
        }
    },
    props: {
        options: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    mounted() {
        this.config = {
            ...this.config,
            ...this.options,
        }
        this.ctx = this.$refs.canvas.$el.getContext('2d');
        if (this.config.imgSrc) {
            this.createImg();
        }
    },
    methods: {
        createCanvas() {
            // create the qrcode itself
			var qrcode	= new QRCode(this.options.typeNumber, this.options.correctLevel);
			qrcode.addData(this.options.text);
			qrcode.make();
			// create canvas element
			this.canvasStyle.width = options.width;
            this.canvasStyle.height = options.height + 50;
			var ctx	= this.$refs.canvas.getContext('2d');
			// compute tileW/tileH based on options.width/options.height
			var tileW = this.options.width  / qrcode.getModuleCount();
			var tileH = this.options.height / qrcode.getModuleCount();
			// draw in the canvas
			for( var row = 0; row < qrcode.getModuleCount(); row++ ){
				for( var col = 0; col < qrcode.getModuleCount(); col++ ){
					ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
					var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
					var h = (Math.ceil((row+1)*tileH) - Math.floor(row*tileH));
					ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h);  
				}	
			}
			// return just built canvas
			return canvas;
        },
        createImg() {
            var img = new Image();
            img.onload = () => {
                img.width = this.config.imgWidth;
                img.height = this.config.imgHeight;
                const y = (this.config.width - this.config.imgWidth) / 2;
                const x = (this.config.height - this.config.imgHeight) / 2;
                this.ctx.drawImage(this, x, y, this.config.imgHeight, this.config.imgWidth);
            }
        },
    },
}
</script>
