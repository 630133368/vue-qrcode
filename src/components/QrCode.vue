<template>
  <div>
    <canvas 
        class="vue-qrcode-canvas" 
        :width="config.width" 
        :height="config.height + config.textConfig.textHeight" 
        ref="canvas"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import QRCode from '../assets/qrcode';
import qrCodeInterface from '../types/qrCode';

@Component
export default class QrCode extends Vue {
    @Prop({default: () => {
        return {};
    }})
    private options!: qrCodeInterface;
    private config: qrCodeInterface = {
                width: 300,
                height: 300,
                background: '#fff',
                correctLevel: 2,
                foreground: '#000000',
                render: 'canvas',
                text: '',
                codeUrl: '',
                typeNumber: -1,
                imgSrc: '',
                imgWidth: 0,
                imgHeight: 0,
                textConfig: {
                    textHeight: 100,
                    fontSize: 36,
                    color: '#000',
                },
            };
    private QRCode: any = QRCode;
    private ctx: any = null;
    private canvasHeight: number = 0;
    @Watch('options', {
        deep: true,
    })
    private watchBindValue(val: any, old: any) {
        this.canvasChange();
    }
    private mounted() {
        this.canvasRender();
    }
    private saveFile(data: any, fileName: string) {
        const a = document.createElement('a');
        a.href = data;
        a.download = fileName;
        a.click();
    }
    private downLoad(type: number, name: string) {
        const filType: string = this.filterFormat(type);
        const canvas: any = this.$refs.canvas;
        const dataUrl = canvas.toDataURL(filType);
        this.saveFile(dataUrl, name);
    }
    private filterFormat(type: number) {
        let res: string = '';
        switch (type) {
            case 0:
                res = 'image/png';
                break;
            case 1:
                res = 'image/jpeg';
                break;
            case 2:
                res = 'image/gif';
                break;
            default:
                res = 'image/png';
                break;
        }
        return res;
    }
    private createCanvas() {
        // create the qrcode itself
        const canvas: any = this.$refs.canvas;
        const qrcode: any = new QRCode(this.config.typeNumber, this.config.correctLevel);
        qrcode.addData(this.config.codeUrl);
        qrcode.make();
        // create canvas element
        const ctx = canvas.getContext('2d');
        // compute tileW/tileH based on options.width/options.height
        const tileW = this.config.width  / qrcode.getModuleCount();
        const tileH = this.config.height / qrcode.getModuleCount();
        // draw in the canvas
        for (let row = 0; row < qrcode.getModuleCount(); row ++) {
            for (let col = 0; col < qrcode.getModuleCount(); col ++) {
                ctx.fillStyle = qrcode.isDark(row, col) ? this.config.foreground : this.config.background;
                const w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
                const h = (Math.ceil((row + 1) * tileH) - Math.floor(row * tileH));
                ctx.fillRect(Math.round(col * tileW), Math.round(row * tileH), w, h);
            }
        }
        // return just built canvas
        return canvas;
    }
    private createImg() {
        const img = new Image();
        img.src = this.config.imgSrc;
        img.onload = () => {
            img.width = this.config.imgWidth;
            img.height = this.config.imgHeight;
            const y = (this.config.height - this.config.imgHeight) / 2;
            const x = (this.config.width - this.config.imgWidth) / 2;
            this.ctx.drawImage(img, x, y, this.config.imgWidth, this.config.imgHeight);
        };
    }
    private createText() {
        this.ctx.font = `${this.config.textConfig.fontSize}px bold 黑体`;
        this.ctx.fillStyle = this.config.textConfig.color;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.config.text,
            this.config.width / 2,
            this.config.height + (this.config.textConfig.textHeight / 2),
            this.config.width);
    }
    private canvasChange() {
        this.ctx.clearRect(1000, 1000, 1000, 1000);
        this.canvasRender();
    }
    private canvasRender() {
        this.config = {
            ...this.config,
            ...this.options,
        };
        const canvas: any = this.$refs.canvas;
        this.ctx = canvas.getContext('2d');
        this.createCanvas();
        if (this.config.imgSrc) {
            this.createImg();
        }
        if (this.config.text) {
            this.createText();
        }
    }
}
</script>

<style lang="scss">

</style>
