{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.11";
    systems.url = "github:nix-systems/default";
  };

  outputs =
    { systems
    , nixpkgs
    , ...
    } @ inputs:
    let
      eachSystem = f:
        nixpkgs.lib.genAttrs (import systems) (
          system:
          f nixpkgs.legacyPackages.${system}
        );
    in
    {
      devShells = eachSystem (pkgs: {
        default = pkgs.mkShell {
          buildInputs = with pkgs; [
            dprint
            nodejs_21
          ];
        };
      });
    };
}
