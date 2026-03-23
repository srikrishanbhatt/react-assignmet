const UserCard = ({ user, onSelect, isSelected, insightState, onGenerateInsights }) => {
  const status = insightState?.status || "idle";
  const insightText = insightState?.text || "";
  const errorMessage = insightState?.error || "";
  const isLoading = status === "loading";
  const hasInsight = status === "success" && Boolean(insightText);
  const buttonLabel = hasInsight ? "Regenerate Insights" : "Generate Insights";

  return (
    <article className={`card user-card${isSelected ? " selected" : ""}`}>
      <button type="button" className="user-card-select" onClick={() => onSelect(user)}>
        <h4>{user.name}</h4>
        <p>{user.email}</p>
        <p>Role: {user.role}</p>
        <p>Status: {user.status}</p>
        <p>Language: {user.language}</p>
      </button>

      <div className="insight-panel">
        <button
          type="button"
          className="insight-button"
          onClick={() => onGenerateInsights(user, { force: hasInsight })}
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : buttonLabel}
        </button>

        {isLoading ? <p className="insight-status">Generating AI insight...</p> : null}
        {errorMessage ? <p className="insight-error">{errorMessage}</p> : null}
        {insightText ? (
          <div className="insight-result">
            <p className="insight-label">Smart Insight</p>
            <p>{insightText}</p>
          </div>
        ) : null}
      </div>
    </article>
  );
};

export default UserCard;
