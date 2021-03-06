/**处理页面响应式布局
 * Created by weikaiwei on 2017/7/13.
 */

export default (function(){
    function setBase(){
        /**
         * window.orientation： 0或180表述竖屏，-90或90表示横屏
         * */
        function getOrientation(){

            // : “portrait-primary”默认 是竖屏, “portrait-secondary”默认的基础上旋转90度,
            //“landscape-primary”和 “landscape-secondary”
//            锁住屏幕方向
            var orientation = window.screen.orientation;
//            orientation.lock("landscape-primary");
//            window.screen.lockOrientation = screen.lockOrientation ||screen.mozLockOrientation || screen.msLockOrientation;
//            window.screen.unlockOrientation = screen.unlockOrientation|| screen.mozUnLockOrientation || screen.msUnLockOrientation;


            return 0;
        }
        /**基准 * 页面宽度 / 设计稿宽度
         * 设计稿： 750 * 1334
         * 以100px作为rem的基准，谷歌不支持12px以下（其它浏览器没有这个限制）
         * 例： a * b，用作高宽的时候，a和b任意一方小于12px，都会使用12px来计算；
         * 如果用作font-size，a和b没有要求，但是运算的结果如果小于12px，则计算结果是12px
         *
         * rem计算规则：
         * 1、设计稿尺寸是基于2倍的retina屏幕，基准比例换算的时候除以二
         * 2、如果客户终端屏幕尺寸小于等于基准值，按照基准值(100)来显示；大于基准值则等比放大
         *
         * 兼容：使用华为浏览器，第一次打开标签加载网页时，window.innerWidth和window.innerHeight不准确，即使延时处理也不能确定具体的时间
         * document.body.clientWidth是准确的
         * */
        var bw = "width", bh = "height", tw = "offsetWidth", th = "offsetHeight",
            baseObject = {width: 1024 * 1.5, height: 768 * 1.5},
            rootEl = (document.documentElement || document.body),
            baseRatio = baseObject[bw] / baseObject[bh],
            base = baseObject[bw], //window.innerWidth < window.innerHeight ? baseWidth : baseHeight,
            terminal = rootEl[tw], terminalRatio = rootEl[tw] / rootEl[th],
            scaleRatio = 1,
            rem;
        /**比较理想尺寸和设备实际的宽高比，保持理想尺寸的高宽比
         * 如果实际比例大于理想比例（实际的高度小于比例高度），以实际高度为基准，根据比例计算出应有的宽度
         */
        if(terminalRatio > baseRatio){
            terminal = rootEl[th] * baseRatio;
        }
        rem = 100 * (terminal / base);
        rootEl.style.fontSize = rem + "px";
        window.responser = {
            /**根据设计稿理想尺寸和设备实际尺寸的比例，等比计算出理想尺寸所对应的设备尺寸
             * */
            responseSize: function(size, reverse){
                return reverse ? size * (base / terminal) : size / (base / terminal);
            }
        };
    }
    window.addEventListener("resize", setBase);
    setBase();
}());
