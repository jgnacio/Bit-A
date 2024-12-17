#pragma glslify:noise=require(glsl-noise/simplex/3d)

varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;
uniform float uAspectRatio;
uniform float uScrollOffset;
uniform vec3 uColourPalette[4];
uniform float uScale;
uniform float uUvDistortionIterations;
uniform float uUvDistortionItensity;

uniform float uGrainAmount;
uniform float uGrainSize;

// Function to generate film noise
float random(vec2 st){
  return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

vec4 linearToSRGB(in vec4 value){
  vec3 linearRGB=value.rgb;
  vec3 sRGB=mix(
    pow(linearRGB,vec3(1./2.4))*1.055-vec3(.055),
    linearRGB*12.92,
    vec3(lessThanEqual(linearRGB,vec3(.0031308)))
  );
  return vec4(sRGB,value.a);
}

vec3 cosineGradientColor(in float t,in vec3 a,in vec3 b,in vec3 c,in vec3 d){
  return clamp(a+b*cos(6.28318*(c*t+d)),0.,1.);
}

// Function to add vignette
float vignette(vec2 uv,float intensity){
  vec2 position=uv-vec2(.5);
  return 1.-length(position)*intensity;
}

void main(){
  // Adjust UV coordinates to maintain aspect ratio
  vec2 uv=vUv;
  uv=uv*2.-1.;// Normalize to [-1, 1] range
  uv.x*=uAspectRatio;// Stretch or compress based on aspect ratio
  uv=uv*.5+.5;// Re-normalize back to [0, 1] range
  
  uv*=uScale;
  
  uv.y-=uScrollOffset*5.;
  
  // UV Distortion
  for(float i=0.;i<uUvDistortionIterations;i++){
    uv+=noise(vec3(uv-i*.2,uTime+i*32.))*uUvDistortionItensity;
  }
  
  // Base Color
  float colorInput=noise(vec3(uv,sin(uTime)))*.5+.5;
  vec3 colour=cosineGradientColor(colorInput,uColourPalette[0],uColourPalette[1],uColourPalette[2],uColourPalette[3]);
  
  // Add film grain
  vec2 grainUv=vUv*uGrainSize;
  float grain=random(grainUv+vec2(uTime*.001));
  colour=mix(colour,vec3(grain),uGrainAmount*.15);
  
  // Add vignette
  float vig=vignette(vUv,1.);
  colour*=mix(.8,1.,vig);
  
  // Contrast and saturation adjustment
  vec3 contrasted=pow(colour,vec3(1.1));
  colour=mix(colour,contrasted,.5);
  
  // Slight warm tint
  vec3 warmTint=vec3(1.02,1.,.98);
  colour*=warmTint;
  
  // Final curves adjustment
  colour=pow(colour,vec3(.95));
  
  gl_FragColor=vec4(colour,1.);
}