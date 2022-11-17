#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]


use tauri::{
  api::process::{Command/* , CommandEvent */},
  Manager,
  CustomMenuItem,
   SystemTray, 
   SystemTrayMenu,
   SystemTrayMenuItem,
   SystemTrayEvent,

};

use std::process::Command as StdCommand;
use std::io::BufReader;
use command_group::CommandGroup;
#[cfg(not(target_os = "macos"))]
use system_uri::{install, App, SystemUriError};
#[cfg(not(target_os = "macos"))]
use unwrap::unwrap;


#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
  // Close splashscreen
  if let Some(splashscreen) = window.get_window("splashscreen") {
    splashscreen.close().unwrap();
  }
  // Show main window
  window.get_window("main").unwrap().show().unwrap();
}

/*  #[tauri::command]
async fn download_file <R: Runtime>(
  window: tauri::Window<R>,
  args: Vec<String>,
) -> Result<(), String> {
  let command = Command::new_sidecar("ytdlp").unwrap();
  let (mut rx, _) = command.args(args).spawn().unwrap();

  async_runtime::spawn(async move {
    // read events such as stdout
    while let Some(event) = rx.recv().await {
      match event {
        CommandEvent::Stderr(line) => {
          println!("stderr: {}", line);
          window
            .emit(
              "logs",
              Some(format!("stderr: {}", line)),
            )
            .unwrap();
        }
        CommandEvent::Terminated(terminated) => {
          window
            .emit(
              "logs",
              Some(format!("Download endded: {:#?}", terminated)),
            )
            .unwrap();
          window.emit("logs:end", terminated).unwrap();
        }
        _ => {}
      }
    }
  });
  Ok(())
}
   */

#[cfg(not(target_os = "macos"))]
fn install_schema() -> Result<(), SystemUriError> {
  let exec = String::from(unwrap!(unwrap!(std::env::current_exe()).to_str()));
  let app = App::new(
    "com.nabil.kamyroll".to_string(),
    "Kamyroll OSS".to_string(),
    "Kamyroll".to_string(),
    exec,
    None,
  );
  let schema = "kamyroll".to_string();
  install(&app, &[schema.clone()]).and_then(|()| Ok(()))
}


fn main() {

  #[cfg(not(target_os = "macos"))]
  if let Err(ref e) = install_schema() {
    println!("error: {}", e);
  }

  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let hide = CustomMenuItem::new("hide".to_string(), "Hide");
  let show = CustomMenuItem::new("show".to_string(),"Show");
  let tray_menu = SystemTrayMenu::new()
    .add_item(hide)
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(quit)
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(show);
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
        let window = app.get_window("main").unwrap();
        window.show().unwrap();
    }
    SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
        "quit" => {
            std::process::exit(0);
        }
        "hide" => {
            let window = app.get_window("main").unwrap();
            window.hide().unwrap();
        }
        "show" => {
            let window = app.get_window("main").unwrap();
            window.show().unwrap();
        }
        _ => {}
    },
    _ => {}
})
.setup(|_app| {
  tauri::async_runtime::spawn(async move {
    let tauri_cmd = Command::new_sidecar("main").expect("failed to setup `proxy` sidecar");
    let mut std_cmd = StdCommand::from(tauri_cmd);
    let mut child = std_cmd
      .group_spawn() // !
      .expect("failed to spawn `proxy` sidecar");
    let mut stdout = BufReader::new(child.inner().stdout.take().unwrap());
    
     let mut buf = Vec::new();
    loop {
      buf.clear();
      match tauri::utils::io::read_line(&mut stdout, &mut buf) {
          Ok(_n) => {
              let _line = String::from_utf8_lossy(&buf);
          }
          Err(_e) => panic!("idk something bad happened"),
      }
    }
  });
  Ok(())
})
    .plugin(tauri_plugin_window_state::Builder::default().build())
    .invoke_handler(tauri::generate_handler![close_splashscreen/* , download_file */])
    .run(tauri::generate_context!())

    .expect("failed to run app");
}
