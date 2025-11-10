// init = function(){
//   gameover = 0
//   running = 0
//   enemy1 = [200,300,400]
//   passed = [0,0,0]
//   score = 0
//   position = 0
//   speed = 2
// }

// update = function(){
//  if gameover>0 then
//     gameover = gameover+1
//     if gameover>300 then init() end
//   elsif running then
//     position = position+speed
//     speed = speed + 0.001

// //if keyboard.LEFT then "synth" x -= 1 end
//  //if keyboard.RIGHT then "synth" x += 1 end
//    if keyboard.UP and hero_y == 0 then
//     synth_vy = 7
//     audio.beep("square tempo 20000 volume 10 span 100 C4 to C6")
//     end

// synth_vy = synth_vy - 0.3
//   synth_y = max(0,synth_y+synth_vy)
//  // if keyboard.UP then "synth" y += 1 end
//  // if keyboard.DOWN then "synth" y -= 1 end

//   for i=0 to enemy1.length-1
//       if enemy1[i]<position-120 then
//         enemy1[i] = position+280+random.next()*200
//         passed[i] = 0
//       end
//       if abs(position-enemy1[i])<10 then
//         if synth_y<10 then
//           running = 0
//           gameover = 1
//           audio.beep("saw tempo 10000 volume 50 span 50 C2 to C4 to C2 to C4")
//         elsif not passed[i] then
//           passed[i] = 1
//           score += 1
//           audio.beep("saw tempo 960 volume 50 span 20 C6")
//         end
//       end
//     end
//   else
//     if touch.touching then running = 1 end
//   end
// end

// draw = function()
// // screen.fillRect(0,0,screen.width,screen.height,"map")

//   screen.drawMap("map", 0,0,screen.width,screen.height)

//   for i=-6 to 6 by 1
//     screen.drawSprite("wall",i*40-position%40,-80,40)
//   end

//   screen.drawSprite("synth", -80,-43+synth_y,40)
//   for i=0 to enemy1.length-1
//     screen.drawSprite("enemy1",enemy1[i]-position-80,-50,20)
//   end

//   screen.drawText(score,120,80,20,"#FFF")

//   if gameover then
//     screen.fillRect(0,0,screen.width,screen.height,"rgba(255,0,0,.5)")
//     screen.drawText("GAME OVER",0,0,50,"#FFF")
//     elsif not running then
//     screen.drawText("READY?",0,30,50,"#FFF")
//     screen.drawText("click to start",0,-5,15,"#FFF")
//   end
// end
