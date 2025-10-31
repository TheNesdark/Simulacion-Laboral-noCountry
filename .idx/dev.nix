# To learn more about how to use Nix to configure your environment
# see: https://firebase.google.com/docs/studio/customize-workspace
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.jdk21
    pkgs.maven
    pkgs.postgresql
  ];

  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        backend = {
          command = ["bash" "-c" "cd backend/portal-citas/portal-citas && mvn spring-boot:run"];
          manager = "web";
          env = {
            PORT = "$PORT";
          };
        };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        install-backend = "cd backend/portal-citas/portal-citas && mvn clean install -DskipTests";
      };
      # Runs when the workspace is (re)started
      onStart = {
        run-backend = "cd backend/portal-citas/portal-citas && mvn spring-boot:run";
      };
    };
  };
}
