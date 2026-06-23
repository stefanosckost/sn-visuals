export function OceanBackground() {
  return (
    <div
      className="ocean-background"
      aria-hidden="true"
    >
      <div className="ocean-depth ocean-depth--far" />
      <div className="ocean-depth ocean-depth--middle" />
      <div className="ocean-depth ocean-depth--near" />
      <div className="ocean-caustics" />
      <div className="ocean-particles" />
      <div className="ocean-vignette" />
    </div>
  );
}
