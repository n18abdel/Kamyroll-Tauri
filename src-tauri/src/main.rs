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
use tauri::{utils::config::AppUrl, WindowUrl};
use std::process::Command as StdCommand;
use std::io::BufReader;
use std::os::windows::process::CommandExt;
use command_group::CommandGroup;


#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
  // Close splashscreen
  if let Some(splashscreen) = window.get_window("splashscreen") {
    splashscreen.close().unwrap();
  }
  // Show main window
  window.get_window("main").unwrap().show().unwrap();
}

/* #[tauri::command]
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


fn main() {
  let port = portpicker::pick_unused_port().expect("failed to find unused port");

  let mut context = tauri::generate_context!();
  let url = format!("http://localhost:{}", port).parse().unwrap();
  let window_url = WindowUrl::External(url);
  
  context.config_mut().build.dist_dir = AppUrl::Url(window_url.clone());
  /* context.config_mut().build.dev_path = AppUrl::Url(window_url.clone());  */

  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let hide = CustomMenuItem::new("hide".to_string(), "Hide");
  let tray_menu = SystemTrayMenu::new()
    .add_item(hide)
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(quit);
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
        _ => {}
    },
    _ => {}
})
.setup(|_app| {
  tauri::async_runtime::spawn(async move {
    let tauri_cmd = Command::new_sidecar("main").expect("failed to setup `proxy` sidecar");
    let mut std_cmd = StdCommand::from(tauri_cmd);
    let mut child = std_cmd
      .creation_flags(0x08000000) 
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
    .invoke_handler(tauri::generate_handler![close_splashscreen/* , download_file */])
    .plugin(tauri_plugin_localhost::Builder::new(port).build())
    .run(context)
    .expect("failed to run app");
}
