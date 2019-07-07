// ページの読み込み終了後に実行
window.addEventListener('load', init);
// リサイズイベント発生時に実行
var timer = false;
window.addEventListener('resize', function() {
  if (timer !== false) {
    clearTimeout(timer);
  }
  timer = setTimeout(function() {
    init();
  }, 300);
});

const imageList = ["images/0.jpg",
                   "images/1.jpg",
                   "images/2.jpg",
                   "images/3.jpg",
                   "images/4.jpg",
                   "images/5.jpg",
                   "images/6.jpg",
                   "images/7.jpg",
                   "images/8.jpg",
                   "images/9.jpg",
                   "images/10.jpg"]

function init() {

  // サイズを指定
  const width = window.innerWidth;
  const height = window.innerHeight;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#photos')
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);//描画サイズ
  renderer.setClearColor(new THREE.Color(0x000000));//背景色

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(30, width / height);
  camera.position.set(0, 0, +1000);

  //画像を配置
  for (let i = 0; i < 20; i++) {
    //マテリアル作成
    const material = new THREE.SpriteMaterial({
      map: new THREE.TextureLoader().load(imageList[Math.floor(Math.random()*imageList.length)]),
    });
    const sprite = new THREE.Sprite(material);
    // ランダムな座標に配置,中心を原点に持ってくるために「-0.5」(rondomは0〜１なので)
    sprite.position.x = 500 * (Math.random() - 0.5);
    sprite.position.y = 500 * (Math.random() - 0.5);
    sprite.position.z = 500 * (Math.random() - 0.5);
    // スケールを調整
    sprite.scale.set(120, 80, 0);
    scene.add(sprite);
  }

// 地面を作成
const plane = new THREE.GridHelper(300, 10, 0x888888, 0x888888);
scene.add(plane);

  let rot = 0;
  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    rot += 0.3; // 毎フレーム角度を0.5度ずつ足していく
    const radian = (rot * Math.PI) / 180;
    // 角度に応じてカメラの位置を設定
    camera.position.x = 150 * Math.sin(radian);
    camera.position.y = 150 * Math.cos(radian);
    camera.position.z = 150 * Math.cos(radian);
    camera.lookAt(new THREE.Vector3(0, 0, 0));//原点を見つめる
    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}