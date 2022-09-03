
#![allow(non_snake_case)]
#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]


use tauri::{
  api::process::{Command, CommandEvent},
  Manager,
  CustomMenuItem,
   SystemTray, 
   SystemTrayMenu,
   SystemTrayMenuItem,
   SystemTrayEvent
};
/* use std::process::Command as StdCommand;*/




#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
  // Close splashscreen
  if let Some(splashscreen) = window.get_window("splashscreen") {
    splashscreen.close().unwrap();
  }
  // Show main window
  window.get_window("main").unwrap().show().unwrap();
}





fn main() {
  let hide = CustomMenuItem::new("hide".to_string(), "Hide");
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let tray_menu = SystemTrayMenu::new()
    .add_item(quit)
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(hide);
  tauri::Builder::default()
  .system_tray(SystemTray::new().with_menu(tray_menu))
  .on_system_tray_event(|app, event| match event {
    SystemTrayEvent::LeftClick {
        position: _,
        size: _,
        ..
    } => {
        println!("system tray received a left click");
    }
    SystemTrayEvent::RightClick {
        position: _,
        size: _,
        ..
    } => {
        println!("system tray received a right click");
    }
    SystemTrayEvent::DoubleClick {
        position: _,
        size: _,
        ..
    } => {
        println!("system tray received a double click");
    }
    SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
        "quit" => {
            std::process::exit(0);
        }
        "hide" => {
            let window = app.get_window("main").unwrap();
            window.hide().unwrap();
        }
        _ => {}
    },
    _ => {}
})
  .setup(|app| {
    let window = app.get_window("main").unwrap();
    tauri::async_runtime::spawn(async move {
      let (mut rx, mut child) = Command::new_sidecar("main")
        .expect("failed to setup `proxy` sidecar")
        .spawn()
        .expect("failed to spawn `proxy` sidecar");
      let mut i = 0;
      while let Some(event) = rx.recv().await {
        if let CommandEvent::Stdout(line) = event {
          window
            .emit("message", Some(format!("'{}'", line)))
            .expect("failed to emit event");
          i += 1;
          if i == 4 {
            child.write("message from Rust\n".as_bytes()).unwrap();
            i = 0;
          }
        }
      }
    });
    
    Ok(())
  })
    .invoke_handler(tauri::generate_handler![close_splashscreen])
    .run(tauri::generate_context!())
    .expect("failed to run app");
}
