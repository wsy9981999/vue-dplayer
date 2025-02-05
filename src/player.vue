<script lang="ts" setup>
import DPlayer, {
  type DPlayerDanmaku,
  type DPlayerEvents,
  type DPlayerOptions as Option,
   type DPlayerVideo
} from "dplayer";
import { onMounted, onUnmounted, ref, type Ref, useTemplateRef} from "vue";

interface DPlayerOptions extends Option {
  airplay?: boolean,
  chromecast?: boolean,
  playbackSpeed?: number[],
  preventClickToggle?: boolean
}


const props = withDefaults(defineProps<Omit<DPlayerOptions, 'container'>>(), {
  live: false,
  autoplay: false,
  theme: '#b7daff',
  loop: false,
  lang: 'zh-cn',
  screenshot: false,
  hotkey: true,
  airplay: false,
  chromecast: false,
  preload: 'auto',
  volume: .7,
  playbackSpeed: () => [0.5, 0.75, 1, 1.25, 1.5, 2],
  highlight: () => [],
  contextmenu: () => [],
  preventClickToggle: false,
  mutex: false
})

const DplayerEvent={
  abort: [],
  canplay: [],
  canplaythrough: [],
  durationchange: [],
  emptied: [],
  ended: [],
  error: [],
  loadeddata: [],
  loadedmetadata: [],
  loadstart: [],
  mozaudioavailable: [],
  pause: [],
  play: [],
  playing: [],
  progress: [],
  ratechange: [],
  seeked: [],
  seeking: [],
  stalled: [],
  suspend: [],
  timeupdate: [],
  volumechange: [],
  waiting: [],
  screenshot: [],
  thumbnails_show: [],
  thumbnails_hide: [],
  danmaku_show: [],
  danmaku_hide: [],
  danmaku_clear: [],
  danmaku_loaded: [],
  danmaku_send: [],
  danmaku_opacity: [],
  contextmenu_show: [],
  contextmenu_hide: [],
  notice_show: [],
  notice_hide: [],
  quality_start: [],
  quality_end: [],
  destroy: [],
  resize: [],
  fullscreen: [],
  fullscreen_cancel: [],
  subtitle_show: [],
  subtitle_hide: [],
  subtitle_change: [],


}
interface EventD {
  abort: [],
  canplay: [],
  canplaythrough: [],
  durationchange: [],
  emptied: [],
  ended: [],
  error: [],
  loadeddata: [],
  loadedmetadata: [],
  loadstart: [],
  mozaudioavailable: [],
  pause: [],
  play: [],
  playing: [],
  progress: [],
  ratechange: [],
  seeked: [],
  seeking: [],
  stalled: [],
  suspend: [],
  timeupdate: [],
  volumechange: [],
  waiting: [],
  screenshot: [],
  thumbnails_show: [],
  thumbnails_hide: [],
  danmaku_show: [],
  danmaku_hide: [],
  danmaku_clear: [],
  danmaku_loaded: [],
  danmaku_send: [],
  danmaku_opacity: [],
  contextmenu_show: [],
  contextmenu_hide: [],
  notice_show: [],
  notice_hide: [],
  quality_start: [],
  quality_end: [],
  destroy: [],
  resize: [],
  fullscreen: [],
  fullscreen_cancel: [],
  subtitle_show: [],
  subtitle_hide: [],
  subtitle_change: [],
  [key: string]: [];
}

const emit = defineEmits<EventD>()



const player = useTemplateRef<HTMLDivElement>('player')
let p: Ref<InstanceType<typeof DPlayer> | null> = ref(null)

const play=()=> {
  if (p.value) {
    p.value.play();
  }
};

const pause=()=> {
  if (p.value) {
    p.value.pause();
  }
};

const seek=(time:number)=> {
  if (p.value) {
    p.value.seek(time);
  }
};

const toggle=()=> {
  if (p.value) {
    p.value.toggle();
  }
};

const switchVideo=( video: DPlayerVideo,     danmaku: DPlayerDanmaku)=> {
  if (p.value) {
    p.value.switchVideo(video,danmaku);
  }
};

const notice=( text: string,     time: number,     opacity: number,)=> {
  if (p.value) {
    p.value.notice(text,     time,     opacity);
  }
};

const switchQuality=(index:number)=> {
  if (p.value) {
    p.value.switchQuality(index);
  }
};

const speed=(rate: number)=> {
  if (p.value) {
    p.value.speed(rate);
  }
};

const volume=( percentage: number,     nostorage: boolean,     nonotice: boolean,)=> {
  if (p.value) {
    p.value.volume(percentage, nostorage, nonotice);
  }
};

const video=()=> {
  if (p.value) {
   return  p.value.video;
  }
};

const danmaku=()=> {
  if (p.value) {
   return  p.value.danmaku;
  }
};

const fullScreen=()=> {
  if (p.value) {
   return  p.value.fullScreen;
  }
};

const on=( event: DPlayerEvents,     handler: () => void,)=> {
  if (p.value) {
    p.value.on(event,handler);
  }
};


onMounted(() => {
  //
  // // console.log("mount")
  p.value = new DPlayer({
    container: player.value!!,
    ...props
  })
  for (let e in DplayerEvent) {
    p.value.on(e as DPlayerEvents,()=>{
        (emit as any)(e)
    })
  }


})
defineExpose({
  play,
  pause,
  seek,
  toggle,
  switchVideo,
  notice,
  switchQuality,
  speed,
  volume,
  video,
  danmaku,
  fullScreen,
  on,
})

onUnmounted(() => {
  if (p.value) {
    p.value.destroy()
    p.value = null
  }
})

</script>
<template>
  <div ref="player"></div>
</template>